import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  UserPlus,
  Sparkles,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  LogIn,
  Check,
  Trash2,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ViewScreen, UserProfile, NotificationItem } from '../types';
import { DEMO_USERS } from '../data/authStore';

interface TopNavProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
  onToggleSidebar?: () => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  onSwitchUser: (newUser: UserProfile) => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onClearNotifications: () => void;
  onSearchSubmit?: (term: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenInvite,
  onToggleSidebar,
  user,
  onOpenAuth,
  onOpenProfile,
  onLogout,
  onSwitchUser,
  notifications,
  onMarkNotificationsRead,
  onClearNotifications,
  onSearchSubmit,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery.trim());
      }
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 select-none z-20 sticky top-0">
      {/* Left section: Mobile menu toggle + Global Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
            placeholder="Search destinations, curated stays, itineraries, or flights..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                if (onSearchSubmit) onSearchSubmit(searchQuery);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-900 text-white rounded-md text-[10px] font-bold"
            >
              Go
            </button>
          )}
        </div>
      </div>

      {/* Center Screen Switcher */}
      <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            currentScreen === 'landing'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Landing Page
        </button>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            currentScreen === 'dashboard'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('create')}
          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            currentScreen === 'create'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Trip Customizer
        </button>
        <button
          onClick={() => onNavigate('itinerary')}
          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            currentScreen === 'itinerary'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Itinerary
        </button>
      </div>

      {/* Right Controls: Invite, Notifications, User Auth & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onOpenInvite}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-800 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-slate-700" />
          <span>Invite Friends</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkNotificationsRead}
                      className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={onClearNotifications}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    title="Clear all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-400">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-xl transition-colors text-left text-xs ${
                        n.read ? 'bg-white hover:bg-slate-50' : 'bg-slate-50 hover:bg-slate-100/80 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-[11px] truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Identity or Sign In / Sign Up */}
        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-1 hover:opacity-90 transition-opacity cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-none group-hover:text-orange-600 transition-colors">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 leading-none block mt-0.5">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                {/* User Header */}
                <div className="p-3 bg-slate-50 rounded-xl mb-1 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-900 block truncate">{user.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{user.email}</span>
                      <span className="inline-block text-[9px] font-bold px-1.5 py-0.2 mt-1 rounded bg-teal-100 text-teal-800">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-left cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Profile & Preferences</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigate('itinerary');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-left cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>Active Itinerary</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-left cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Trips & Wishlists</span>
                  </button>
                </div>

                {/* Demo Switcher Quick Section */}
                <div className="pt-2 mt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-1.5">
                    Switch Demo User
                  </span>
                  <div className="grid grid-cols-3 gap-1 px-1">
                    {DEMO_USERS.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => {
                          onSwitchUser(demo);
                          setProfileDropdownOpen(false);
                        }}
                        className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          user.id === demo.id
                            ? 'border-orange-500 bg-orange-50/70 font-bold text-orange-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                        title={demo.name}
                      >
                        <img
                          src={demo.avatar}
                          alt={demo.name}
                          className="w-6 h-6 rounded-full object-cover mx-auto mb-1"
                        />
                        <span className="text-[10px] block truncate">{demo.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sign out */}
                <div className="pt-2 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* User Logged Out / Guest State */
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-1.5 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
