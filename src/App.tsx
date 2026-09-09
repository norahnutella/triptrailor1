/**
 * APP ARCHITECTURE OVERVIEW (TripTailor)
 * =========================================================================
 * This root component is designed to be concise and easy to explain:
 * 
 * 1. Screen Router:
 *    - 'currentScreen' switches between Marketing Landing and Workspace layout
 *    - Screens: 'landing' | 'dashboard' | 'create' | 'itinerary'
 * 
 * 2. Shared Itinerary State:
 *    - 'activities' stores the day's timeline (synced across timeline and map)
 *    - Passed down to ItineraryView and Modals for seamless updates
 * 
 * 3. Unified Modal Manager:
 *    - 'modalState' controls popups (invite, reserve table, bill split, etc.)
 *    - A single clean state object replaces multiple boolean flags
 * 
 * 4. In-App Feedback:
 *    - Non-blocking toast notification banner for user action confirmations
 * =========================================================================
 */

import React, { useState } from 'react';
import { ViewScreen, ActivityItem } from './types';
import { INITIAL_DAY1_ACTIVITIES } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { TripCustomizerView } from './components/TripCustomizerView';
import { ItineraryView } from './components/ItineraryView';
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
  // 1. Navigation State: Default to 'itinerary' (active trip) or quick switcher
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('itinerary');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 2. Core Itinerary State: Dynamic timeline items
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_DAY1_ACTIVITIES);

  // 3. Unified Modal Manager State
  const [modalState, setModalState] = useState<ActiveModal>(null);

  // 4. In-App Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3200);
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111C2D] font-sans flex flex-col antialiased selection:bg-orange-500/20">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen 1: Full Marketing Landing Page */}
      {currentScreen === 'landing' ? (
        <LandingView onNavigate={handleNavigate} />
      ) : (
        /* Workspace Shell: Sidebar + Top Navigation Header + Active View */
        <div className="flex-1 flex min-h-screen overflow-hidden">
          {/* Desktop Left Sidebar */}
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenConcierge={() => setModalState({ type: 'concierge' })}
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
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {currentScreen === 'dashboard' && (
                <DashboardView
                  onNavigate={handleNavigate}
                  onOpenConcierge={() => setModalState({ type: 'concierge' })}
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

      {/* Centralized Modals */}
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

