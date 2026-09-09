import React from 'react';
import {
  Search,
  Bell,
  UserPlus,
  Sparkles,
  Layout,
  Menu,
} from 'lucide-react';
import { ViewScreen } from '../types';

interface TopNavProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
  onToggleSidebar?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenInvite,
  onToggleSidebar,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 select-none z-20">
      {/* Left section: Mobile menu toggle + Global Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destinations, curated stays, itineraries, or flights..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Center Screen Switcher (Helps easily switch between the 4 reference screens) */}
      <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            currentScreen === 'landing'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Landing Page
        </button>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            currentScreen === 'dashboard'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('create')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            currentScreen === 'create'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Trip Customizer
        </button>
        <button
          onClick={() => onNavigate('itinerary')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            currentScreen === 'itinerary'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Itinerary
        </button>
      </div>

      {/* Right Controls: Invite button, Notifications, User Avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenInvite}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-800 text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5 text-slate-700" />
          <span>Invite Friends</span>
        </button>

        <button
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-1">
          <div className="relative cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Elena Vance"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-slate-900 block leading-none">Elena Vance</span>
            <span className="text-[10px] text-slate-500 leading-none">Trip Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
};
