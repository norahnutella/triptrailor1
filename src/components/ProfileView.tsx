import React, { useState } from 'react';
import {
  User,
  Mail,
  Compass,
  DollarSign,
  Heart,
  Luggage,
  Users,
  Shield,
  Check,
  RotateCw,
  LogOut,
  Camera,
  LogIn,
  Sparkles,
  ArrowLeft,
  MapPin,
} from 'lucide-react';
import { UserProfile, ViewScreen } from '../types';
import { DEMO_USERS } from '../data/authStore';

interface ProfileViewProps {
  onNavigate: (screen: ViewScreen) => void;
  user: UserProfile | null;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onSwitchUser: (newUser: UserProfile) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  showToast: (msg: string) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
];

const CUISINES = [
  'Local Street Food',
  'Seafood & Coastal',
  'Fine Dining',
  'Vegetarian & Vegan',
  'Italian',
  'Japanese & Sushi',
  'Indian Spices',
  'Mediterranean',
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  user,
  onUpdateUser,
  onLogout,
  onSwitchUser,
  onOpenAuth,
  showToast,
}) => {
  // If no user is logged in
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Access Your Profile
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Create an account or log in to manage your saved travel destinations, dietary preferences, and travel squad memberships.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </div>

        {/* Demo Fast Log In */}
        <div className="pt-8 border-t border-slate-200 text-left max-w-md mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-center">
            Or Quick Test With A Demo Profile
          </span>
          <div className="space-y-2">
            {DEMO_USERS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => {
                  onSwitchUser(demo);
                  showToast(`Signed in as ${demo.name}!`);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{demo.name}</span>
                    <span className="text-[11px] text-slate-500 block">{demo.email}</span>
                  </div>
                </div>
                <span className="text-xs text-orange-600 font-bold">Select →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Profile Form State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || 'Curious global wanderer, passionate about local food and hidden gems.');
  const [currency, setCurrency] = useState(user.currency || 'USD ($)');
  const [travelPace, setTravelPace] = useState<'Relaxed' | 'Balanced' | 'Packed'>(user.travelPace || 'Balanced');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    user.preferredCuisines || ['Local Street Food', 'Seafood & Coastal']
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      showToast('Choose an image file smaller than 5 MB.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSelectedAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const toggleCuisine = (c: string) => {
    if (selectedCuisines.includes(c)) {
      setSelectedCuisines(selectedCuisines.filter((x) => x !== c));
    } else {
      setSelectedCuisines([...selectedCuisines, c]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      const updated: UserProfile = {
        ...user,
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
        currency,
        travelPace,
        avatar: selectedAvatar,
        preferredCuisines: selectedCuisines,
      };

      onUpdateUser(updated);
      setIsSaving(false);
      showToast('Profile and travel preferences updated successfully!');
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Traveler Profile & Preferences
            </h1>
            <p className="text-slate-600 text-sm mt-0.5">
              Customize your traveler identity, group pacing, preferred currencies, and dining tastes.
            </p>
          </div>

          <button
            onClick={onLogout}
            className="self-start sm:self-auto px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* User Hero Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group shrink-0">
          <img
            src={selectedAvatar}
            alt={name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-orange-500/30 shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">{name}</h2>
            <span className="self-center sm:self-auto px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
              {user.role || 'Trip Lead'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{email}</p>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">{bio}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
              Member since {user.joinedDate || '2024'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
              Currency: {currency}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
              Pacing: {travelPace}
            </span>
          </div>
        </div>
      </div>

      {/* Travel Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-center space-y-1">
          <Luggage className="w-5 h-5 text-orange-600 mx-auto" />
          <span className="text-2xl font-extrabold text-slate-900 block">{user.tripsCount || 3}</span>
          <span className="text-xs font-semibold text-slate-500">Trips Planned</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-center space-y-1">
          <Heart className="w-5 h-5 text-rose-500 mx-auto" />
          <span className="text-2xl font-extrabold text-slate-900 block">{user.savedPlacesCount || 12}</span>
          <span className="text-xs font-semibold text-slate-500">Saved Places</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-center space-y-1">
          <Users className="w-5 h-5 text-blue-600 mx-auto" />
          <span className="text-2xl font-extrabold text-slate-900 block">6</span>
          <span className="text-xs font-semibold text-slate-500">Squad Companions</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-center space-y-1">
          <Compass className="w-5 h-5 text-teal-600 mx-auto" />
          <span className="text-2xl font-extrabold text-slate-900 block">4</span>
          <span className="text-xs font-semibold text-slate-500">Countries Visited</span>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-600" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:bg-white focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Short Bio & Travel Style</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:bg-white focus:border-orange-500 resize-none"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span>Choose Profile Avatar</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {AVATAR_PRESETS.map((avUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(avUrl)}
                  className={`w-12 h-12 rounded-xl overflow-hidden ring-2 transition-all cursor-pointer ${
                    selectedAvatar === avUrl
                      ? 'ring-orange-600 scale-105'
                      : 'ring-transparent hover:ring-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={avUrl} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
              <label className="w-12 h-12 rounded-xl border border-dashed border-slate-300 hover:border-orange-500 bg-slate-50 hover:bg-orange-50 flex items-center justify-center cursor-pointer transition-colors" title="Upload a photo from your device">
                <Camera className="w-4 h-4 text-slate-500" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="sr-only" />
              </label>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">Or upload a profile photo from your device (JPG, PNG, or WebP; up to 5 MB).</p>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-600" />
            <span>Travel & Itinerary Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:bg-white focus:border-orange-500 cursor-pointer"
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>INR (₹)</option>
                <option>JPY (¥)</option>
                <option>AUD ($)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Default Itinerary Pacing
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Relaxed', 'Balanced', 'Packed'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTravelPace(p)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      travelPace === p
                        ? 'bg-orange-50 border-orange-300 text-orange-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dining Preferences */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Favorite Cuisines & Dining Styles
            </label>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine);
                return (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => toggleCuisine(cuisine)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50 border-orange-300 text-orange-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cuisine}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
          >
            {isSaving ? <RotateCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
