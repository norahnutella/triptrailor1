/**
 * DASHBOARD VIEW
 * =========================================================================
 * Purpose:
 *   The primary control desk for the user after sign-in.
 *   Provides:
 *   - Quick destination search bar
 *   - Active pod trips (Goa, Kyoto) with completeness indicators
 *   - Dynamic flight oracle insights
 *   - Inspiration vault & saved places wishlist with pin/unpin toggles
 *   - Live collaborative group activity feed
 * =========================================================================
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  SlidersHorizontal,
  Plus,
  Compass,
  Check,
  CreditCard,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { ViewScreen, UserProfile } from '../types';
import { RECENT_DESTINATIONS, SAVED_PLACES } from '../data/mockData';

interface DashboardViewProps {
  onNavigate: (screen: ViewScreen) => void;
  onOpenConcierge: () => void;
  user?: UserProfile | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenConcierge,
  user,
}) => {
  const [destinationInput, setDestinationInput] = useState('Kyoto, Japan');
  const [datesInput, setDatesInput] = useState('18 Nov – 24 Nov');
  const [pinnedPlaces, setPinnedPlaces] = useState<string[]>(['sp-1', 'sp-2', 'sp-3', 'sp-4']);
  const [notification, setNotification] = useState<string | null>(null);

  const displayName = user ? user.name.split(' ')[0] : 'Explorer';
  const roleTitle = user?.role || 'Trip Lead';

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const togglePin = (id: string) => {
    if (pinnedPlaces.includes(id)) {
      setPinnedPlaces(pinnedPlaces.filter((p) => p !== id));
      showToast('Removed place from saved wishlist.');
    } else {
      setPinnedPlaces([...pinnedPlaces, id]);
      showToast('Saved place to your travel wishlist!');
    }
  };

  return (
    <div id="dashboard-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Non-blocking feedback notification banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Greeting & Search Header */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60 inline-block">
              Curated Exploration Desk
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
              {roleTitle}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, {displayName} <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Where are you planning to go next? Your travel pod has 3 pending itinerary suggestions.
          </p>
        </div>

        {/* Quick Search Widget */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap sm:flex-nowrap items-center gap-2 max-w-xl">
          <div className="flex items-center gap-2 px-3 py-1.5 flex-1 min-w-[140px]">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
            <div className="text-left w-full">
              <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Destination</span>
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-hidden w-full leading-tight"
              />
            </div>
          </div>

          <div className="hidden sm:block w-[1px] h-7 bg-slate-200"></div>

          <div className="flex items-center gap-2 px-3 py-1.5 flex-1 min-w-[140px]">
            <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
            <div className="text-left w-full">
              <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Dates</span>
              <input
                type="text"
                value={datesInput}
                onChange={(e) => setDatesInput(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-hidden w-full leading-tight"
              />
            </div>
          </div>

          <button
            onClick={() => onNavigate('create')}
            className="w-full sm:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Clean Welcome & Start Trip Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-7 text-white shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automatic Travel Planner</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Where are you headed next?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pick any destination and we will automatically find top attractions, dining spots, and build your collaborative day-by-day itinerary.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('create')}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Create a New Trip</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <span>Quick picks:</span>
              <button onClick={() => onNavigate('itinerary')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer border border-slate-700">
                🏖️ Goa
              </button>
              <button onClick={() => onNavigate('create')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer border border-slate-700">
                ⛩️ Kyoto
              </button>
              <button onClick={() => onNavigate('create')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer border border-slate-700">
                🌴 Bali
              </button>
              <button onClick={() => onNavigate('create')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer border border-slate-700">
                🗼 Paris
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Trips Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Active Pod Itineraries
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Upcoming Trips</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>2 journeys scheduled</span>
            <button className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-600">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2 Active Trip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trip 1: Goa Getaway */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
            <div className="relative h-48 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80"
                alt="Goa Getaway"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-700 border border-amber-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>PLANNING IN PROGRESS • 75%</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                4 Days Away
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Goa Getaway</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>12 Oct – 15 Oct (4 Days)</span>
                    </p>
                  </div>
                  {/* Collaborators */}
                  <div className="flex -space-x-2 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="Elena"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="Anu"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="Megha"
                    />
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                      +S
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 text-[11px] font-semibold">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Beach</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Seafood</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Heritage</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>2 items in review</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-600">Itinerary completeness</span>
                    <span className="text-orange-600">75%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('itinerary')}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Continue Planning</span>
                </button>
                <button
                  onClick={() => onNavigate('itinerary')}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Trip →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trip 2: Autumn in Kyoto */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
            <div className="relative h-48 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80"
                alt="Autumn in Kyoto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>CONFIRMED • 100%</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                Next Month
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Autumn in Kyoto</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>18 Nov – 24 Nov (7 Days)</span>
                    </p>
                  </div>
                  {/* Collaborators */}
                  <div className="flex -space-x-2 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="Elena"
                    />
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                      K
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 text-[11px] font-semibold">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Tea Ceremony</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Ryokan Stay</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Fall Foliage</span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Rail Pass Ready</span>
                  </span>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-emerald-700 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All bookings locked</span>
                  </div>
                  <span>100% Ready</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('itinerary')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>View Itinerary</span>
                </button>
                <button
                  onClick={() => showToast('Kyoto itinerary exported as PDF with synchronized train timetables!')}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Inspiration Vault + Group Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Inspiration Vault & Wishlist */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recently Viewed Destinations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Inspiration Vault
                </span>
                <h3 className="text-base font-bold text-slate-900">Recently Viewed Destinations</h3>
              </div>
              <button className="text-xs font-bold text-orange-600 hover:text-orange-700">
                See all &gt;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RECENT_DESTINATIONS.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col"
                >
                  <div className="h-28 relative">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {dest.country}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{dest.name}</h4>
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                        <span>{dest.temp} • {dest.weather}</span>
                        <span className="font-bold text-slate-800">{dest.estPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('create')}
                      className="w-full py-1.5 bg-slate-50 hover:bg-orange-50 hover:text-orange-700 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors"
                    >
                      + Plan Trip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Places Wishlist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Saved Places Wishlist</h3>
              <span className="text-xs font-bold text-slate-500">14 Items pinned</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAVED_PLACES.map((place) => {
                const isPinned = pinnedPlaces.includes(place.id);
                return (
                  <div
                    key={place.id}
                    className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{place.name}</h5>
                        <p className="text-[11px] text-slate-500">{place.location}</p>
                        <span className="text-[10px] font-semibold text-slate-400">{place.tag}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePin(place.id)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 transition-all ${
                        isPinned
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {isPinned ? <Check className="w-3 h-3 text-teal-600" /> : <Plus className="w-3 h-3" />}
                      <span>{isPinned ? 'Added' : 'Add'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Group Activity Feed & Split Bills Banner */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Group Activity Feed</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Updates</span>
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Recent collaborator votes, bookmarks, and thread notes from your Goa Getaway pod.
            </p>

            {/* Feed items */}
            <div className="space-y-3.5">
              {/* Feed 1 */}
              <div className="flex gap-3 text-xs">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  M
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Megha</span>
                    <span className="text-[10px] text-slate-400">12m ago</span>
                  </div>
                  <p className="text-slate-700">
                    Voted <strong className="text-emerald-700">YES</strong> on 'Fort Aguada Visit'
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-emerald-600" />
                      <span>3 / 4 approved</span>
                    </span>
                    <button
                      onClick={() => onNavigate('itinerary')}
                      className="text-[11px] font-bold text-orange-600 hover:underline"
                    >
                      View Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed 2 */}
              <div className="flex gap-3 text-xs pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  S
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Sarah</span>
                    <span className="text-[10px] text-slate-400">1h ago</span>
                  </div>
                  <p className="text-slate-700">
                    Added <strong className="text-slate-900">'Gunpowder Restaurant'</strong> to Day 2 Dinner options.
                  </p>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    🍴 Coastal South Indian Cuisine
                  </span>
                </div>
              </div>

              {/* Feed 3 */}
              <div className="flex gap-3 text-xs pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  A
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Anu</span>
                    <span className="text-[10px] text-slate-400">3h ago</span>
                  </div>
                  <p className="text-slate-700 italic">
                    Commented in chat: "Shall we book the private sunset catamaran for Saturday evening?"
                  </p>
                  <button
                    onClick={() => onNavigate('itinerary')}
                    className="text-[11px] font-bold text-indigo-600 hover:underline pt-0.5 block"
                  >
                    Reply in Pod Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Split Bills Live Banner */}
          <div
            onClick={() => onNavigate('itinerary')}
            className="cursor-pointer bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/80 p-4 shadow-2xs flex items-center justify-between hover:border-orange-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900">Split bills live</h5>
                <p className="text-[11px] text-slate-600">All 4 cards synced with Pod Vault</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
