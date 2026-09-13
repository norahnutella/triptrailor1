import React, { useState } from 'react';
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
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { TripCustomizerView } from './components/TripCustomizerView';
import { ItineraryView } from './components/ItineraryView';
import { ProfileView } from './components/ProfileView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
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

  // 5. Unified Modal Manager State
  const [modalState, setModalState] = useState<ActiveModal>(null);

  // 6. In-App Notification Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3400);
  };

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
    setCurrentScreen('itinerary');
    showToast(`Itinerary generated for ${tripData.destination} (${daysCount} days)!`);
  };

  // Activity handlers
  const handleAddActivity = (newAct: ActivityItem) => {
    setActivities((prev) => [...prev, newAct]);
    showToast(`Added "${newAct.title}" to day itinerary!`);
  };

  const handleNavigate = (screen: ViewScreen, destination?: string) => {
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
    showToast(message);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#111C2D] font-sans flex flex-col antialiased selection:bg-orange-500/20">
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
                activitiesList={activities}
                setActivitiesList={setActivities}
                currentTrip={currentTrip}
                user={user}
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
        onAddActivity={handleAddActivity}
        dayNumber={modalState?.type === 'addActivity' ? modalState.dayNumber : 1}
      />
    </div>
  );
}

export default App;
