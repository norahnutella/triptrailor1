/**
 * APP ARCHITECTURE OVERVIEW (TripTailor)
 * =========================================================================
 * Purpose:
 *   Root orchestrator for TripTailor collaborative travel design suite.
 *   
 * Capabilities:
 *   1. Screen Routing:
 *      - 'landing': High-conversion marketing presentation & feature showcase
 *      - 'dashboard': Exploration desk, flight trends, live squad feed, wishlist
 *      - 'create': Interactive trip tailor wizard with budget & dining preferences
 *      - 'itinerary': Day-by-day collaborative timeline, route map, pod voting
 * 
 *   2. Authentication & Squad Identity:
 *      - Persistent user session with localStorage backup
 *      - Modal-based Log In & Sign Up with demo account 1-click test drives
 *      - Profile & travel pacing editor with avatar selector & currency switcher
 *      - In-app collaborative notifications drawer
 * 
 *   3. Shared State & Modals:
 *      - Centralized modal union state for invitations, table holds, expense splits,
 *        custom timeline additions, and AI Concierge assistance.
 * =========================================================================
 */

import React, { useState } from 'react';
import { ViewScreen, ActivityItem, UserProfile, NotificationItem } from './types';
import { INITIAL_DAY1_ACTIVITIES } from './data/mockData';
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
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { TripCustomizerView } from './components/TripCustomizerView';
import { ItineraryView } from './components/ItineraryView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import {
  InviteFriendsModal,
  ReserveTableModal,
  DetailedBillModal,
  AddActivityModal,
  AiConciergeModal,
} from './components/Modals';

// Modal state union for type-safe dialog handling
type ActiveModal =
  | { type: 'invite' }
  | { type: 'reserve'; restaurant: string }
  | { type: 'bill' }
  | { type: 'addActivity'; dayNumber: number }
  | { type: 'concierge' }
  | null;

export function App() {
  // 1. Navigation State
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('itinerary');
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

  // 4. Core Itinerary State: Dynamic timeline items
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_DAY1_ACTIVITIES);

  // 5. Unified Modal Manager State
  const [modalState, setModalState] = useState<ActiveModal>(null);

  // 6. In-App Notification Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3400);
  };

  // Activity handlers
  const handleAddActivity = (newAct: ActivityItem) => {
    setActivities((prev) => [...prev, newAct]);
    showToast(`Added "${newAct.title}" to day itinerary!`);
  };

  const handleNavigate = (screen: ViewScreen) => {
    setCurrentScreen(screen);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
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
    showToast(`Searching for "${term}" across itineraries & stays...`);
    if (currentScreen !== 'dashboard' && currentScreen !== 'itinerary') {
      setCurrentScreen('dashboard');
    }
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

      {/* Screen 1: Marketing Landing Page */}
      {currentScreen === 'landing' ? (
        <LandingView
          onNavigate={handleNavigate}
          user={user}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onLogout={handleLogout}
        />
      ) : (
        /* Workspace Shell: Sidebar + Top Navigation Header + Active View */
        <div className="flex-1 flex min-h-screen overflow-hidden">
          {/* Desktop Left Sidebar */}
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenConcierge={() => setModalState({ type: 'concierge' })}
            user={user}
            onOpenProfile={() => setProfileModalOpen(true)}
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
                onOpenConcierge={() => {
                  setMobileSidebarOpen(false);
                  setModalState({ type: 'concierge' });
                }}
                user={user}
                onOpenProfile={() => {
                  setMobileSidebarOpen(false);
                  setProfileModalOpen(true);
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
              onOpenInvite={() => setModalState({ type: 'invite' })}
              onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              user={user}
              onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
              onOpenProfile={() => setProfileModalOpen(true)}
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
                  onOpenConcierge={() => setModalState({ type: 'concierge' })}
                  user={user}
                />
              )}

              {currentScreen === 'create' && (
                <TripCustomizerView
                  onNavigate={handleNavigate}
                  onOpenInvite={() => setModalState({ type: 'invite' })}
                />
              )}

              {currentScreen === 'itinerary' && (
                <ItineraryView
                  onNavigate={handleNavigate}
                  onOpenInvite={() => setModalState({ type: 'invite' })}
                  onOpenReserve={(restaurant) => setModalState({ type: 'reserve', restaurant })}
                  onOpenBill={() => setModalState({ type: 'bill' })}
                  onOpenAddActivity={(dayNumber) => setModalState({ type: 'addActivity', dayNumber })}
                  activitiesList={activities}
                  setActivitiesList={setActivities}
                />
              )}
            </main>
          </div>
        </div>
      )}

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

      <AiConciergeModal
        isOpen={modalState?.type === 'concierge'}
        onClose={() => setModalState(null)}
        onApplySuggestion={(suggestion) => {
          showToast(`Applied AI suggestion: "${suggestion}"`);
          setModalState(null);
          setCurrentScreen('itinerary');
        }}
      />
    </div>
  );
}

export default App;
