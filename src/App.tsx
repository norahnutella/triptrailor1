import React, { useState, useEffect } from 'react';
import { ViewScreen, ActivityItem, UserProfile, NotificationItem, TripData, DayItinerary } from './types';
import { INITIAL_DAY1_ACTIVITIES, GOA_TRIP } from './data/mockData';
import {
  getActiveUser,
  updateUserProfile,
  logoutUser,
  setActiveUser,
  getNotifications,
  markNotificationsAsRead,
  clearAllNotifications,
} from './data/authStore';
import { getUnreadGroupMessagesCount } from './data/groupChatStore';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { TripCustomizerView } from './components/TripCustomizerView';
import { ItineraryView } from './components/ItineraryView';
import { ProfileView } from './components/ProfileView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { SquadChatDrawer } from './components/SquadChatDrawer';
import { PrintableItineraryModal } from './components/PrintableItineraryModal';
import {
  InviteFriendsModal,
  ReserveTableModal,
  DetailedBillModal,
  AddActivityModal,
} from './components/Modals';

// Modal state union for type-safe dialog handling
type ActiveModal =
  | { type: 'invite' }
  | { type: 'reserve'; restaurant: string }
  | { type: 'bill' }
  | { type: 'addActivity'; dayNumber: number }
  | null;

export function App() {
  // 1. Navigation State
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('dashboard');
  const [selectedDestination, setSelectedDestination] = useState<string>('Goa, India');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 2. Authentication & User Profile State
  const [user, setUser] = useState<UserProfile | null>(() => getActiveUser());
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // 3. Collaborative In-App Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getNotifications());

  // 4. Core Itinerary State: Dynamic timeline items and active trip
  const [currentTrip, setCurrentTrip] = useState<TripData>(GOA_TRIP);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_DAY1_ACTIVITIES);
  const [isCurrentTripSaved, setIsCurrentTripSaved] = useState(false);

  // 5. Squad Group Chat Drawer & Printable Itinerary States
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(() =>
    getUnreadGroupMessagesCount(user?.id || 'demo-elena')
  );

  // 6. Unified Modal Manager State
  const [modalState, setModalState] = useState<ActiveModal>(null);

  // 7. In-App Notification Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3400);
  };

  // Sync unread chat count reactively whenever messages are sent/read
  useEffect(() => {
    const handleMessageEvent = () => {
      setUnreadChatCount(getUnreadGroupMessagesCount(user?.id || 'demo-elena'));
    };

    window.addEventListener('triptailor_group_message', handleMessageEvent);
    return () => {
      window.removeEventListener('triptailor_group_message', handleMessageEvent);
    };
  }, [user?.id]);

  // Create Trip handler with dynamic places
  const handleCreateItinerary = (tripData: {
    destination: string;
    dates: string;
    activities: ActivityItem[];
    travelers: number;
    title: string;
    daysCount?: number;
  }) => {
    const destShort = tripData.destination.split(',')[0];
    const daysCount = tripData.daysCount || 4;

    const dayTitles = [
      `${destShort} Highlights & Landmark Walk`,
      `Scenic Sights & Coastal Dining`,
      `Cultural Exploration & Heritage`,
      `Local Artisans & Sunset Vistas`,
      `Hidden Gems & Tasting Tour`,
      `Nature Trek & Relaxation`,
      `Grand Farewell Celebration`,
    ];

    const days: DayItinerary[] = [];
    for (let i = 1; i <= daysCount; i++) {
      const title = dayTitles[(i - 1) % dayTitles.length];
      const startIdx = ((i - 1) * 2) % Math.max(1, tripData.activities.length);
      const dayActs = tripData.activities.slice(startIdx, startIdx + 3);
      days.push({
        dayNumber: i,
        dateStr: `Day ${i} • ${title}`,
        title,
        activities: dayActs.length > 0 ? dayActs : tripData.activities.slice(0, 2),
      });
    }

    const newTrip: TripData = {
      id: `trip-${Date.now()}`,
      title: tripData.title,
      destination: tripData.destination,
      dates: tripData.dates,
      daysCount,
      travelersCount: tripData.travelers,
      budgetTotal: tripData.travelers * (daysCount * 1150),
      budgetPerPerson: daysCount * 1150,
      budgetTier: 'Moderate',
      tags: [destShort.toUpperCase(), `${daysCount} DAYS`, 'CALENDAR CURATED'],
      days,
    };

    setCurrentTrip(newTrip);
    setActivities(days[0].activities);
    setIsCurrentTripSaved(false);
    setCurrentScreen('itinerary');
    showToast(`Itinerary generated for ${tripData.destination} (${daysCount} days)!`);
  };

  // Activity handlers - Reactive updates to master itinerary and current day
  const handleAddActivity = (newAct: ActivityItem, targetDay: number = 1) => {
    setCurrentTrip((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.dayNumber === targetDay) {
          return {
            ...day,
            activities: [...(day.activities || []), newAct],
          };
        }
        return day;
      });
      return {
        ...prev,
        days: updatedDays,
      };
    });

    setActivities((prev) => [...prev, newAct]);
    setIsCurrentTripSaved(false);
    showToast(`Added "${newAct.title}" to Day ${targetDay} itinerary!`);
  };

  const handleRemoveActivity = (activityId: string, dayNumber: number) => {
    setCurrentTrip((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            activities: (day.activities || []).filter((a) => a.id !== activityId),
          };
        }
        return day;
      });
      return {
        ...prev,
        days: updatedDays,
      };
    });

    setActivities((prev) => prev.filter((a) => a.id !== activityId));
    setIsCurrentTripSaved(false);
    showToast('Activity removed from timeline');
  };

  const handleRegenerateItinerary = () => {
    setCurrentTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) => {
        const reordered = day.activities.length > 1
          ? [...day.activities.slice(1), day.activities[0]]
          : day.activities;
        return {
          ...day,
          activities: reordered.map((activity, index) => ({ ...activity, orderNumber: index + 1 })),
        };
      }),
    }));
    setIsCurrentTripSaved(false);
    showToast('A fresh itinerary order is ready to review.');
  };

  const handleUpdateTrip = (updates: Pick<TripData, 'title' | 'dates'>) => {
    setCurrentTrip((prev) => ({ ...prev, ...updates }));
    setIsCurrentTripSaved(false);
    showToast('Itinerary details updated.');
  };

  const handleSaveTrip = () => {
    setIsCurrentTripSaved(true);
    showToast('Itinerary saved to your trips.');
  };

  const handleNavigate = (screen: ViewScreen, destination?: string) => {
    if (screen === 'create' && !user) {
      setAuthModal({ isOpen: true, mode: 'login' });
      showToast('Please log in or sign up before creating a trip.');
      return;
    }
    if (destination) {
      setSelectedDestination(destination);
    }
    setCurrentScreen(screen);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
  const handleOpenInvite = () => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' });
      showToast('Please log in to invite friends to your travel squad.');
      return;
    }
    setModalState({ type: 'invite' });
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile, message: string) => {
    setUser(authenticatedUser);
    setUnreadChatCount(getUnreadGroupMessagesCount(authenticatedUser.id));
    showToast(message);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setUnreadChatCount(getUnreadGroupMessagesCount('demo-elena'));
    showToast('Signed out of TripTailor.');
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    const updated = updateUserProfile(updates);
    setUser(updated);
    showToast('Profile & preferences saved!');
  };

  const handleSwitchUser = (newUser: UserProfile) => {
    setActiveUser(newUser);
    setUser(newUser);
    setUnreadChatCount(getUnreadGroupMessagesCount(newUser.id));
    showToast(`Switched account to ${newUser.name} (${newUser.role})`);
  };

  const handleMarkNotificationsRead = () => {
    const updated = markNotificationsAsRead();
    setNotifications(updated);
    showToast('All notifications marked as read.');
  };

  const handleClearNotifications = () => {
    const empty = clearAllNotifications();
    setNotifications(empty);
    showToast('Cleared notifications.');
  };

  const handleSearchSubmit = (term: string) => {
    setSelectedDestination(term);
    setCurrentScreen('create');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#26342D] font-sans flex flex-col antialiased selection:bg-orange-500/20">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Workspace Shell: Sidebar + Top Navigation Header + Active View */}
      <div className="flex-1 flex min-h-screen overflow-hidden">
        {/* Desktop Left Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          user={user}
          onOpenProfile={() => setCurrentScreen('profile')}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onOpenChat={user ? () => setIsChatDrawerOpen(true) : undefined}
          unreadChatCount={unreadChatCount}
          className="hidden lg:flex"
        />

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <Sidebar
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
              user={user}
              onOpenProfile={() => {
                setMobileSidebarOpen(false);
                setCurrentScreen('profile');
              }}
              onOpenAuth={(mode) => {
                setMobileSidebarOpen(false);
                setAuthModal({ isOpen: true, mode });
              }}
              onOpenChat={user ? () => {
                setMobileSidebarOpen(false);
                setIsChatDrawerOpen(true);
              } : undefined}
              unreadChatCount={unreadChatCount}
              className="relative z-10 w-72 h-full"
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <TopNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenInvite={handleOpenInvite}
            onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            user={user}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
            onOpenProfile={() => setCurrentScreen('profile')}
            onLogout={handleLogout}
            onSwitchUser={handleSwitchUser}
            notifications={notifications}
            onMarkNotificationsRead={handleMarkNotificationsRead}
            onClearNotifications={handleClearNotifications}
            onSearchSubmit={handleSearchSubmit}
            onOpenChat={user ? () => setIsChatDrawerOpen(true) : undefined}
            unreadChatCount={unreadChatCount}
            onOpenPrint={() => setIsPrintModalOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {currentScreen === 'dashboard' && (
              <DashboardView
                onNavigate={handleNavigate}
                user={user}
              />
            )}

            {currentScreen === 'create' && (
              <TripCustomizerView
                onNavigate={handleNavigate}
                onOpenInvite={handleOpenInvite}
                onCreateItinerary={handleCreateItinerary}
                initialDestination={selectedDestination}
              />
            )}

            {currentScreen === 'itinerary' && (
              <ItineraryView
                onNavigate={handleNavigate}
                onOpenInvite={handleOpenInvite}
                onOpenReserve={(restaurant) => setModalState({ type: 'reserve', restaurant })}
                onOpenBill={() => setModalState({ type: 'bill' })}
                onOpenAddActivity={(dayNumber) => setModalState({ type: 'addActivity', dayNumber })}
                onOpenPrint={user ? () => setIsPrintModalOpen(true) : undefined}
                onOpenChat={user ? () => setIsChatDrawerOpen(true) : undefined}
                unreadChatCount={unreadChatCount}
                onRemoveActivity={handleRemoveActivity}
                currentTrip={currentTrip}
                user={user}
                onRegenerate={handleRegenerateItinerary}
                onUpdateTrip={handleUpdateTrip}
                onSave={handleSaveTrip}
                isSaved={isCurrentTripSaved}
              />
            )}

            {currentScreen === 'profile' && (
              <ProfileView
                onNavigate={handleNavigate}
                user={user}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                onSwitchUser={handleSwitchUser}
                onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
                showToast={showToast}
              />
            )}

            {currentScreen === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                user={user}
              />
            )}
          </main>
        </div>
      </div>

      {/* Squad Group Chat Drawer */}
      <SquadChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => {
          setIsChatDrawerOpen(false);
          setUnreadChatCount(getUnreadGroupMessagesCount(user?.id || 'demo-elena'));
        }}
        currentUser={user}
        onSwitchUser={handleSwitchUser}
        onOpenAddActivity={(day) => {
          setModalState({ type: 'addActivity', dayNumber: day || 1 });
        }}
      />

      {/* Official Printable Itinerary Modal */}
      <PrintableItineraryModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        trip={currentTrip}
        user={user}
      />

      {/* Authentication Modal: Log In & Sign Up */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        initialMode={authModal.mode}
        onSuccess={handleAuthSuccess}
      />

      {/* User Profile & Account Settings Modal */}
      {user && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={user}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          onSwitchUser={handleSwitchUser}
        />
      )}

      {/* Centralized Workspace Modals */}
      <InviteFriendsModal
        isOpen={modalState?.type === 'invite'}
        onClose={() => setModalState(null)}
        user={user}
      />

      <ReserveTableModal
        isOpen={modalState?.type === 'reserve'}
        onClose={() => setModalState(null)}
        restaurantName={modalState?.type === 'reserve' ? modalState.restaurant : ''}
      />

      <DetailedBillModal
        isOpen={modalState?.type === 'bill'}
        onClose={() => setModalState(null)}
      />

      <AddActivityModal
        isOpen={modalState?.type === 'addActivity'}
        onClose={() => setModalState(null)}
        onAdd={handleAddActivity}
        dayNumber={modalState?.type === 'addActivity' ? modalState.dayNumber : 1}
        totalDays={currentTrip.days.length}
      />
    </div>
  );
}

export default App;
