import React from 'react';
import {
  LayoutDashboard,
  Luggage,
  Compass,
  Plus,
  Users,
  Bookmark,
  Sparkles,
  Settings,
  LogIn,
  Shield,
} from 'lucide-react';
import { ViewScreen, UserProfile } from '../types';

interface SidebarProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  onOpenConcierge: () => void;
  user: UserProfile | null;
  onOpenProfile: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenConcierge,
  user,
  onOpenProfile,
  onOpenAuth,
  className = '',
}) => {
  return (
    <aside
      id="workspace-sidebar"
      className={`w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between p-4 shrink-0 select-none ${className}`}
    >
      {/* Brand & Workspace Navigation */}
      <div className="space-y-6">
        {/* Brand Lockup */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer py-1 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-teal-300" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">TripTailor</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 tracking-wider">
              PRO
            </span>
          </div>
        </div>

        {/* Section: WORKSPACE */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
            Workspace
          </span>
          <nav className="space-y-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentScreen === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('itinerary')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentScreen === 'itinerary'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Luggage className="w-4 h-4 shrink-0" />
              <span>My Trips</span>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700">
                {user?.tripsCount || 2}
              </span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Discover</span>
            </button>

            {/* Create Trip Action Button */}
            <div className="pt-2 pb-1">
              <button
                onClick={() => onNavigate('create')}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  currentScreen === 'create'
                    ? 'bg-orange-600 text-white ring-2 ring-orange-500/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Create Trip</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('itinerary')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Group Pods</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4 shrink-0" />
              <span>Saved Places</span>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {user?.savedPlacesCount || 14}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Section: Concierge + User Account Footer */}
      <div className="space-y-3 pt-3">
        {/* AI Trip Concierge Card */}
        <div className="bg-gradient-to-br from-teal-50/80 to-slate-50 border border-teal-200/70 rounded-2xl p-3.5 space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800">
            <Sparkles className="w-4 h-4 text-teal-600 animate-pulse shrink-0" />
            <span className="text-xs font-bold tracking-tight">AI Trip Concierge</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Need auto-scheduled multi-city routing or local dining suggestions?
          </p>
          <button
            onClick={onOpenConcierge}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Launch Planner
          </button>
        </div>

        {/* User Profile Bar or Guest Login Button */}
        {user ? (
          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
            >
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-orange-600 transition-colors">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {user.role}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenProfile}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Account Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
            <p className="text-[11px] text-slate-600">Sign in to sync your collaborative travel pods.</p>
            <button
              onClick={() => onOpenAuth('login')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
