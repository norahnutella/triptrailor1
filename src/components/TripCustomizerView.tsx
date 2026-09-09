/**
 * TRIP CUSTOMIZER VIEW (Simplified & Place Auto-Generation)
 * =========================================================================
 * Purpose:
 *   A friendly, clean, and simple trip builder.
 *   - Automatically generates places & attractions for whatever destination
 *     the user types or selects.
 *   - Allows travelers to toggle, add custom places, and pick their trip pace.
 *   - Generates a real day-by-day itinerary on submission.
 * =========================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Plus,
  Minus,
  Check,
  RotateCw,
  Clock,
  ArrowRight,
  Trash2,
  Compass,
} from 'lucide-react';
import { ViewScreen, ActivityItem } from '../types';
import {
  GeneratedPlace,
  generatePlacesForDestination,
  buildItineraryFromPlaces,
} from '../data/placesGenerator';

interface TripCustomizerViewProps {
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
  onCreateItinerary: (tripData: {
    destination: string;
    dates: string;
    activities: ActivityItem[];
    travelers: number;
    title: string;
  }) => void;
}

const POPULAR_DESTINATIONS = [
  { name: 'Goa, India', label: '🏖️ Goa' },
  { name: 'Kyoto, Japan', label: '⛩️ Kyoto' },
  { name: 'Bali, Indonesia', label: '🌴 Bali' },
  { name: 'Paris, France', label: '🗼 Paris' },
  { name: 'Tokyo, Japan', label: '🍣 Tokyo' },
  { name: 'Amalfi Coast, Italy', label: '🍋 Amalfi' },
];

export const TripCustomizerView: React.FC<TripCustomizerViewProps> = ({
  onNavigate,
  onOpenInvite,
  onCreateItinerary,
}) => {
  // 1. Destination State
  const [destination, setDestination] = useState('Goa, India');
  const [travelSchedule, setTravelSchedule] = useState('12 Oct 2025 – 15 Oct 2025');
  const [travelers, setTravelers] = useState(4);
  const [pacing, setPacing] = useState<'Relaxed' | 'Balanced' | 'Fast'>('Balanced');

  // 2. Auto-Generated Places State
  const [places, setPlaces] = useState<GeneratedPlace[]>(() =>
    generatePlacesForDestination('Goa, India')
  );

  // 3. Custom Spot Inline Input
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<'Sightseeing' | 'Food & Dining' | 'Beach' | 'Nature' | 'Activity'>('Sightseeing');

  // 4. Loading indicator during itinerary generation
  const [isGenerating, setIsGenerating] = useState(false);

  // Automatically generate places whenever destination changes
  const handleDestinationChange = (newDest: string) => {
    setDestination(newDest);
    const newPlaces = generatePlacesForDestination(newDest);
    setPlaces(newPlaces);
  };

  // Toggle selection of a place
  const togglePlace = (id: string) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  // Regenerate/shuffle places
  const handleRefreshPlaces = () => {
    const fresh = generatePlacesForDestination(destination);
    setPlaces(fresh);
  };

  // Add custom spot
  const handleAddCustomPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newSpot: GeneratedPlace = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: customCategory,
      description: `Custom activity added for ${destination}.`,
      duration: '2.0 hrs',
      estCost: 'Free',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
      tags: ['Custom Stop', customCategory],
      selected: true,
    };

    setPlaces((prev) => [newSpot, ...prev]);
    setCustomName('');
    setIsAddingCustom(false);
  };

  const selectedPlaces = places.filter((p) => p.selected);

  // Final submission: build itinerary and open
  const handleCreateTrip = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const activities = buildItineraryFromPlaces(destination, selectedPlaces);
      onCreateItinerary({
        destination,
        dates: travelSchedule,
        activities,
        travelers,
        title: `Your ${destination.split(',')[0]} Trip`,
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Simple, Friendly Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Easy Trip Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Plan your next adventure
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Choose a destination and we'll automatically generate the best spots to visit.
        </p>
      </div>

      {/* Step 1: Destination & Dates Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-600" />
          <span>1. Where and when are you traveling?</span>
        </h2>

        {/* Destination input + quick chips */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              placeholder="e.g. Goa, Kyoto, Paris, Bali..."
              className="w-full pl-4 pr-32 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-orange-500 focus:bg-white transition-colors"
            />
            <button
              onClick={handleRefreshPlaces}
              className="absolute right-2 top-2 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              <RotateCw className="w-3 h-3 text-slate-500" />
              <span>Generate</span>
            </button>
          </div>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Popular:</span>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onClick={() => handleDestinationChange(dest.name)}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  destination.toLowerCase().includes(dest.name.split(',')[0].toLowerCase())
                    ? 'bg-orange-50 border-orange-300 text-orange-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dates & Travelers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Travel Dates</span>
            </label>
            <input
              type="text"
              value={travelSchedule}
              onChange={(e) => setTravelSchedule(e.target.value)}
              placeholder="e.g. 12 Oct – 15 Oct 2025"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Group Size</span>
            </label>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-fit">
              <button
                type="button"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 font-bold cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold text-slate-800 min-w-[70px] text-center">
                {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
              </span>
              <button
                type="button"
                onClick={() => setTravelers(travelers + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 font-bold cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Auto-Generated Places (The Star Feature!) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>2. Auto-generated places for {destination}</span>
            </h2>
            <p className="text-xs text-slate-500">
              We selected {places.length} top spots. Click to include or remove them from your schedule.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshPlaces}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCw className="w-3 h-3 text-slate-500" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setIsAddingCustom(!isAddingCustom)}
              className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3 text-orange-600" />
              <span>Add Custom Spot</span>
            </button>
          </div>
        </div>

        {/* Inline Add Custom Spot Form */}
        {isAddingCustom && (
          <form onSubmit={handleAddCustomPlace} className="p-3.5 bg-orange-50/50 border border-orange-200 rounded-xl space-y-3 animate-in fade-in">
            <span className="text-xs font-bold text-orange-950 block">Add your own favorite place:</span>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Grandma's Secret Bakery, Sunset Point"
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden"
              >
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Beach">Beach</option>
                <option value="Nature">Nature</option>
                <option value="Activity">Activity</option>
              </select>
              <button
                type="submit"
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                Add Place
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => togglePlace(place.id)}
              className={`group relative rounded-xl border p-3 flex flex-col justify-between transition-all cursor-pointer ${
                place.selected
                  ? 'bg-white border-orange-400 ring-2 ring-orange-400/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-60 hover:opacity-100 hover:bg-white'
              }`}
            >
              <div className="space-y-2.5">
                {/* Image and badges */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                    {place.category}
                  </span>
                  <div
                    className={`absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      place.selected
                        ? 'bg-orange-600 text-white'
                        : 'bg-white/90 text-slate-400 border border-slate-300'
                    }`}
                  >
                    {place.selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-3 border-t border-slate-100 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{place.duration}</span>
                </span>
                <span className="text-slate-700 font-bold">{place.estCost}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Summary Pill */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="font-semibold text-slate-700">
            <strong>{selectedPlaces.length}</strong> of {places.length} places selected for your itinerary
          </span>
          <button
            onClick={() => setPlaces(places.map((p) => ({ ...p, selected: true })))}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            Select All
          </button>
        </div>
      </div>

      {/* Step 3: Simple Trip Pace */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>3. Trip Pace</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'Relaxed',
              label: '☕ Relaxed',
              desc: '1–2 places per day with plenty of free chill time.',
            },
            {
              id: 'Balanced',
              label: '⚖️ Balanced',
              desc: '2–3 places per day. Good mix of sights & relaxing.',
            },
            {
              id: 'Fast',
              label: '⚡ Active',
              desc: '3–4 places per day to see as much as possible.',
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPacing(item.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                pacing === item.id
                  ? 'bg-orange-50/70 border-orange-400 ring-1 ring-orange-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="font-bold text-sm text-slate-900 mb-1">{item.label}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Final Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 text-white shadow-lg">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-orange-400 block uppercase tracking-wider">
            Ready to build
          </span>
          <p className="text-sm font-semibold text-slate-200">
            {selectedPlaces.length} places selected for {destination}
          </p>
        </div>

        <button
          onClick={handleCreateTrip}
          disabled={isGenerating || selectedPlaces.length === 0}
          className="w-full sm:w-auto px-7 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Building Itinerary...' : `Create Itinerary (${selectedPlaces.length} Places)`}</span>
          {!isGenerating && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
