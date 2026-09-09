import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Check,
  Plus,
  Minus,
  Crown,
  Compass,
  Utensils,
  Camera,
  Waves,
  Coffee,
  Trees,
  ShoppingBag,
  Landmark,
  Music,
  Clock,
  UserPlus,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ViewScreen } from '../types';

interface TripCustomizerViewProps {
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
}

export const TripCustomizerView: React.FC<TripCustomizerViewProps> = ({
  onNavigate,
  onOpenInvite,
}) => {
  // Form State
  const [destination, setDestination] = useState('Goa, India');
  const [travelSchedule, setTravelSchedule] = useState('12 Oct 2025 — 15 Oct 2025');
  const [adults, setAdults] = useState(4);
  const [children, setChildren] = useState(0);

  const [selectedBudgetTier, setSelectedBudgetTier] = useState<'Budget' | 'Moderate' | 'Premium' | 'Luxury'>('Moderate');
  const [customBudgetCap, setCustomBudgetCap] = useState('20,000');

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Beaches',
    'Food',
    'History',
    'Photography',
    'Relaxation',
  ]);

  const [selectedDining, setSelectedDining] = useState<string[]>([
    'Local cuisine',
    'Seafood',
    'Cafes',
  ]);

  const [pacing, setPacing] = useState<'Relaxed' | 'Balanced' | 'Packed'>('Balanced');
  const [customNotes, setCustomNotes] = useState(
    'e.g., We love scenic sunset spots, authentic local beach shacks, and prefer not waking up before 8:30 AM.'
  );

  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const toggleDining = (dish: string) => {
    if (selectedDining.includes(dish)) {
      setSelectedDining(selectedDining.filter((d) => d !== dish));
    } else {
      setSelectedDining([...selectedDining, dish]);
    }
  };

  const handleGenerate = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      onNavigate('itinerary');
    }, 1500);
  };

  const groupTotal = (parseInt(customBudgetCap.replace(/,/g, '')) || 20000) * adults;

  return (
    <div id="trip-customizer-view" className="space-y-6 max-w-7xl mx-auto pb-24">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#111C2D] via-[#17253B] to-[#1E2E48] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-bold text-teal-400">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>AUTONOMOUS TRIP ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Let's tailor your trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Tell our AI travel assistant about your dream trip. We'll generate an optimal itinerary tailored to your group's budget, culinary cravings, and collective vibe.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-700/80 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">AI Engine v4.2 Ready</span>
        </div>
      </div>

      {/* Step Progression Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {/* Step 1 */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 text-white font-semibold shadow-xs">
          <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            ✓
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Step 01</span>
            <span className="text-xs font-bold">Destination & Dates</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-950 font-semibold">
          <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-orange-700 block leading-none">Step 02 • Active</span>
            <span className="text-xs font-bold">Travelers & Budget</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 text-slate-800 font-semibold">
          <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Step 03 • In Sync</span>
            <span className="text-xs font-bold">Vibe & Interests</span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 text-slate-500 font-medium">
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
            4
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Step 04</span>
            <span className="text-xs font-semibold text-slate-600">Food & Dining</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Main Form + Blueprint Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Customizer Options */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Destination & Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Destination & Timeline</span>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                AUTO-GEOCODED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Where do you want to go?
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-slate-400">
                  <Compass className="w-4 h-4 text-orange-600 shrink-0" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-transparent outline-hidden"
                  />
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Travel Schedule (4 Days)
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-slate-400">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={travelSchedule}
                    onChange={(e) => setTravelSchedule(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-transparent outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Steppers: Adults & Children */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Adults</span>
                  <span className="text-[11px] text-slate-500 font-medium">Age 13 and above</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold text-slate-900 w-4 text-center">{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Children</span>
                  <span className="text-[11px] text-slate-500 font-medium">Ages 0 to 12</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold text-slate-900 w-4 text-center">{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Budget Range & Splitting */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <span>Budget Range & Splitting</span>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
                Allocated target: ₹{customBudgetCap} / person
              </span>
            </div>

            {/* 4 Budget Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Budget */}
              <div
                onClick={() => {
                  setSelectedBudgetTier('Budget');
                  setCustomBudgetCap('10,000');
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                  selectedBudgetTier === 'Budget'
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Budget</span>
                    <span className="text-[10px] text-slate-500">&le;INR 10K</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    Backpacker friendly, social hostels & local street food gems.
                  </p>
                </div>
              </div>

              {/* Moderate (Selected) */}
              <div
                onClick={() => {
                  setSelectedBudgetTier('Moderate');
                  setCustomBudgetCap('20,000');
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                  selectedBudgetTier === 'Moderate'
                    ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Moderate</span>
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-md">
                      ✓ SELECTED
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">& INR 15K – 25K</span>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1 font-medium">
                    Charming boutique beach villas, casual sit-down dining & cab rentals.
                  </p>
                </div>
              </div>

              {/* Premium */}
              <div
                onClick={() => {
                  setSelectedBudgetTier('Premium');
                  setCustomBudgetCap('35,000');
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                  selectedBudgetTier === 'Premium'
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Premium</span>
                    <span className="text-[10px] text-slate-500">& INR 25K – 45K</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    4-star seaside resorts, guided private water excursions & sundowners.
                  </p>
                </div>
              </div>

              {/* Luxury */}
              <div
                onClick={() => {
                  setSelectedBudgetTier('Luxury');
                  setCustomBudgetCap('55,000');
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                  selectedBudgetTier === 'Luxury'
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Luxury</span>
                    <span className="text-[10px] text-slate-500">& INR 50K+</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    5-star heritage estates, private yacht charters & bespoke masterchefs.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom budget cap & projection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Exact Custom Budget Cap (Per Traveler)
                </label>
                <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-600 mr-1">₹</span>
                  <input
                    type="text"
                    value={customBudgetCap}
                    onChange={(e) => setCustomBudgetCap(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-transparent outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Group Total Projection
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl">
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{groupTotal.toLocaleString()} ({adults} Pax)
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                    Tier 2 Tiering
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vibe & Core Interests */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <span>Vibe & Core Interests</span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {selectedInterests.length} Selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Beaches', icon: '🏖️' },
                { name: 'Food', icon: '🍲' },
                { name: 'History', icon: '🏛️' },
                { name: 'Photography', icon: '📷' },
                { name: 'Relaxation', icon: '🧘' },
                { name: 'Nature', icon: '🌿' },
                { name: 'Shopping', icon: '🛍️' },
                { name: 'Culture', icon: '🎭' },
                { name: 'Adventure', icon: '🧗' },
                { name: 'Nightlife', icon: '🎵' },
                { name: 'Cafes', icon: '☕' },
                { name: 'Entertainment', icon: '🎪' },
              ].map((item) => {
                const isSelected = selectedInterests.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleInterest(item.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-2xs ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 4: Culinary Palette & Dining */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Utensils className="w-4 h-4 text-orange-600" />
                <span>Culinary Palette & Dining</span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Dietary & Taste
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                'Local cuisine',
                'Seafood',
                'Cafes',
                'Street food',
                'Fine dining',
                'Vegetarian',
                'Vegan',
                'No preference',
              ].map((taste) => {
                const isSelected = selectedDining.includes(taste);
                return (
                  <button
                    key={taste}
                    type="button"
                    onClick={() => toggleDining(taste)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                    <span>{taste}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 5: Travel Pacing */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Travel Pacing</span>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full">
                ENERGY MATCH
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Relaxed */}
              <div
                onClick={() => setPacing('Relaxed')}
                className={`cursor-pointer p-4 rounded-xl border transition-all space-y-2 ${
                  pacing === 'Relaxed'
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Relaxed</span>
                  <span>🌱</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  1–2 curated activities per day, late starts, and plenty of unstructured leisure beach time.
                </p>
                <div className="h-1 bg-slate-200 rounded-full w-1/3 mt-2"></div>
              </div>

              {/* Balanced */}
              <div
                onClick={() => setPacing('Balanced')}
                className={`cursor-pointer p-4 rounded-xl border transition-all space-y-2 ${
                  pacing === 'Balanced'
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Balanced</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${pacing === 'Balanced' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    ACTIVE ⚡
                  </span>
                </div>
                <p className={`text-[11px] leading-snug ${pacing === 'Balanced' ? 'text-slate-300' : 'text-slate-600'}`}>
                  2–3 activities per day. A harmonious mix of exploring local heritage spots and chilling at cafes.
                </p>
                <div className="flex gap-1 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${pacing === 'Balanced' ? 'bg-teal-400' : 'bg-slate-300'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${pacing === 'Balanced' ? 'bg-teal-400' : 'bg-slate-300'}`}></div>
                  <div className="h-1 flex-1 rounded-full bg-slate-700"></div>
                </div>
              </div>

              {/* Packed */}
              <div
                onClick={() => setPacing('Packed')}
                className={`cursor-pointer p-4 rounded-xl border transition-all space-y-2 ${
                  pacing === 'Packed'
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Packed</span>
                  <span>⚡</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Action-packed dawn-to-dusk sights, maximum landmarks, vibrant nightlife, and immersive tours.
                </p>
                <div className="h-1 bg-amber-500 rounded-full w-full mt-2"></div>
              </div>
            </div>
          </div>

          {/* Card 6: Additional Group Notes & Custom Prompts */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span>Additional Group Notes & Custom Prompts</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Optional</span>
            </div>
            <p className="text-xs text-slate-500">
              Give our AI planner specific context: dietary quirks, mobility needs, or idiosyncratic habits your group has.
            </p>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-slate-400 text-slate-700 leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column (4 cols): Trip Blueprint Live Preview */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Trip Blueprint</h3>
              <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/70">
                LIVE PREVIEW
              </span>
            </div>

            {/* Visual Thumbnail Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80"
                alt="Goa Coastal Gateway"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">Oct 12 – 15</span>
                <h4 className="font-extrabold text-base leading-tight">Goa Coastal Gateway</h4>
                <p className="text-[11px] text-slate-200">India • 4 Days • 3 Nights</p>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Travelers</span>
                <span className="font-bold text-slate-900">{adults} Adults</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Pacing</span>
                <span className="font-bold text-slate-900">
                  {pacing} ({pacing === 'Relaxed' ? '1–2' : pacing === 'Balanced' ? '2–3' : '4+'} items/day)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Budget Tier</span>
                <span className="font-bold text-slate-900">
                  {selectedBudgetTier} (₹{customBudgetCap}/pax)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Culinary Focus</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px]">
                  {selectedDining.slice(0, 3).join(' • ')}
                </span>
              </div>
            </div>

            {/* AI Prediction Callout */}
            <div className="p-3.5 bg-teal-50/70 border border-teal-200/70 rounded-xl space-y-1 text-xs text-teal-950">
              <div className="flex items-center gap-1.5 font-bold text-teal-900">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>Tailor Synthesis Prediction</span>
              </div>
              <p className="text-[11px] text-teal-800 leading-relaxed">
                Based on your {adults}-person group, we will schedule 2 coastal heritage walks in Fontainhas, sunset sessions in Vagator, and reserve dining at verified beach bistros.
              </p>
            </div>

            {/* Squad actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onOpenInvite}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <UserPlus className="w-3.5 h-3.5 text-slate-600" />
                <span>Invite Group to Fill Together</span>
              </button>

              <button
                onClick={() => alert('Trip configuration draft saved successfully to your profile!')}
                className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar for Generation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-3.5 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>
              <strong>Estimated synthesis time:</strong> ~15 seconds to synthesize 4 days with routing, maps & reservations
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => alert('Draft saved to pod')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handleGenerate}
              disabled={isSynthesizing}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className={`w-4 h-4 ${isSynthesizing ? 'animate-spin' : ''}`} />
              <span>{isSynthesizing ? 'Synthesizing Itinerary...' : '✨ Generate My Itinerary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
