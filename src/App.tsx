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

export function App() {
  // Navigation State - Default to 'itinerary' (as in Image 7) or easy switcher
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('itinerary');

  // Mobile drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dynamic itinerary activities state
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_DAY1_ACTIVITIES);

  // Modals state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reserveRestaurant, setReserveRestaurant] = useState('Gunpowder / Fisherman\'s Wharf');
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [addDayNum, setAddDayNum] = useState(1);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  const handleOpenReserve = (restaurant: string) => {
    setReserveRestaurant(restaurant);
    setIsReserveOpen(true);
  };

  const handleOpenAddActivity = (dayNum: number) => {
    setAddDayNum(dayNum);
    setIsAddActivityOpen(true);
  };

  const handleAddActivity = (newAct: ActivityItem) => {
    setActivities((prev) => [...prev, newAct]);
  };

  const handleNavigate = (screen: ViewScreen) => {
    setCurrentScreen(screen);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111C2D] font-sans flex flex-col antialiased selection:bg-orange-500/20">
      {/* If currentScreen is 'landing', show full marketing page (Image 1) with direct links into workspace */}
      {currentScreen === 'landing' ? (
        <LandingView onNavigate={handleNavigate} />
      ) : (
        /* Workspace Layout (Image 3, 5, 7): Sidebar + Top Header + Main Content */
        <div className="flex-1 flex min-h-screen overflow-hidden">
          {/* Desktop Left Sidebar */}
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            className="hidden lg:flex"
          />

          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                onClick={() => setMobileSidebarOpen(false)}
              ></div>
              <Sidebar
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                onOpenConcierge={() => {
                  setMobileSidebarOpen(false);
                  setIsConciergeOpen(true);
                }}
                className="relative z-10 w-72 h-full"
              />
            </div>
          )}

          {/* Right Main Column */}
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
            {/* Top Navigation Bar */}
            <TopNav
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
              onOpenInvite={() => setIsInviteOpen(true)}
              onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            />

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {currentScreen === 'dashboard' && (
                <DashboardView
                  onNavigate={handleNavigate}
                  onOpenConcierge={() => setIsConciergeOpen(true)}
                />
              )}

              {currentScreen === 'create' && (
                <TripCustomizerView
                  onNavigate={handleNavigate}
                  onOpenInvite={() => setIsInviteOpen(true)}
                />
              )}

              {currentScreen === 'itinerary' && (
                <ItineraryView
                  onNavigate={handleNavigate}
                  onOpenInvite={() => setIsInviteOpen(true)}
                  onOpenReserve={handleOpenReserve}
                  onOpenBill={() => setIsBillOpen(true)}
                  onOpenAddActivity={handleOpenAddActivity}
                  activitiesList={activities}
                  setActivitiesList={setActivities}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Reusable Functional Modals */}
      <InviteFriendsModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      <ReserveTableModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        restaurantName={reserveRestaurant}
      />

      <DetailedBillModal
        isOpen={isBillOpen}
        onClose={() => setIsBillOpen(false)}
      />

      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAddActivity={handleAddActivity}
        dayNumber={addDayNum}
      />

      <AiConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onApplySuggestion={(suggestion) => {
          // If suggestion includes dining, add or update
          alert(`Applied suggestion: "${suggestion}" to active plan!`);
          setIsConciergeOpen(false);
          setCurrentScreen('itinerary');
        }}
      />
    </div>
  );
}

export default App;
