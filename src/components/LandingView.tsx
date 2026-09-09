import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Users,
  ThumbsUp,
  Globe,
  Sliders,
  Check,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Clock,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { ViewScreen, UserProfile } from '../types';

interface LandingViewProps {
  onNavigate: (screen: ViewScreen) => void;
  user?: UserProfile | null;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onLogout?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111C2D] flex flex-col selection:bg-orange-500/20">
      {/* Landing Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-teal-300" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight">TripTailor</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => onNavigate('landing')} className="text-slate-900 font-bold hover:text-orange-600 transition-colors cursor-pointer">
            Home
          </button>
          <a href="#features" className="hover:text-orange-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-orange-600 transition-colors">Community</a>
          <a href="#pricing" className="hover:text-orange-600 transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-1.5 cursor-pointer hidden sm:inline-block"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('create')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Plan My Trip
              </button>
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <span className="hidden lg:inline-block text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                  {user.name.split(' ')[0]}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth?.('signup')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Intelligent Group Travel Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Plan your perfect trip, <span className="text-[#F97316]">together.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
            TripTailor uses AI to turn your preferences into a personalized itinerary while helping your group discuss, vote, and finalize every part of the journey.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3.5 bg-[#B85006] hover:bg-orange-700 text-white font-bold text-sm sm:text-base rounded-xl flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('itinerary')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-xl border border-slate-200/90 flex items-center gap-2 shadow-xs transition-all"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Explore Trips</span>
            </button>
          </div>

          {/* Social Proof Stack */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="traveler"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="traveler"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="traveler"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                14k
              </div>
            </div>
            <div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-600">Loved by modern trip planners globally</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Live Sync Card */}
        <div className="lg:col-span-5">
          <div
            onClick={() => onNavigate('itinerary')}
            className="cursor-pointer bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/90 relative hover:shadow-2xl transition-all duration-300"
          >
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>AI CURATED • Live Sync</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    alt="avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    alt="avatar"
                  />
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    +1
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Group Match */}
            <div className="py-4">
              <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">
                Goa Beach & Heritage Discovery
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                <span>👥 4 Travelers</span>
                <span>•</span>
                <span className="text-teal-700 font-semibold">🎯 92% Group Match</span>
              </div>
            </div>

            {/* Inner Schedule Box */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Day 02 • Coastal Heritage & Sunsets</span>
                <span className="text-slate-400 font-normal">Nov 14</span>
              </div>

              {/* Item 1 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs">
                    ☕
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Artisan Breakfast at Fontainhas</h4>
                    <p className="text-[10px] text-slate-500">09:00 AM • Panjim Latin Quarter</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  👍 4/4
                </span>
              </div>

              {/* Item 2 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs">
                    ⛵
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">Catamaran Sailing & Hidden Caves</h4>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-sm">Poll Open</span>
                    </div>
                    <p className="text-[10px] text-slate-500">02:30 PM • Morjim Sanctuary</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  ⛵ 3 Yes
                </span>
              </div>

              {/* Item 3 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
                    🍴
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Clifftop Seafood at Thalassa</h4>
                    <p className="text-[10px] text-slate-500">06:45 PM • Table Reserved</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Booked
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1 text-slate-800 font-bold">
                <span>Group Est:</span>
                <span>$1,840</span>
                <span className="text-slate-400 font-normal">($460/ea)</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-600 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Maya is editing day 3...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">45,000+</p>
              <p className="text-xs font-medium text-slate-500">Group Trips Planned smoothly</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">98%</p>
              <p className="text-xs font-medium text-slate-500">Consensus Rate on Activities</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">120+</p>
              <p className="text-xs font-medium text-slate-500">Curated Global Destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-2">
              Built for Co-Travelers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Precision travel, frictionless teamwork
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Say goodbye to endless WhatsApp message chaos, scattered Google sheets, and decision paralysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Algorithm Engine
            </span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              AI-Powered Itineraries
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intelligent day-by-day routing that balances pacing, travel times, optimal sunset windows, and group budgets.
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 pt-2"
            >
              Learn more →
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Hyper-Tailored
            </span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              Personalized Recommendations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated attractions, dining, and boutique hotels matching the unique overlap of your group's taste profiles.
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 pt-2"
            >
              Discover stays →
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Democratic Curation
            </span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Group Planning & Voting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time polls, live chat, and instant consensus scoring without leaving the itinerary canvas.
            </p>
            <button
              onClick={() => onNavigate('itinerary')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 pt-2"
            >
              Explore polls →
            </button>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Turnkey Ops
            </span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              Smart Trip Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shared budget splitters, automated PDF exports, offline maps access, and synchronized flight updates.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 pt-2"
            >
              View tools →
            </button>
          </div>
        </div>
      </section>

      {/* How TripTailor Crafts Your Journey */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 bg-white/60 rounded-3xl border border-slate-200/60 my-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block">
            Intuitive Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How TripTailor Crafts Your Journey
          </h2>
          <p className="text-sm text-slate-600">
            From vague ideas to boarding pass in hand—coordinated and streamlined in four effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl font-black text-orange-600">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-base">Tell us</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Share your desired destination, travel dates, expected budget, and individual pace preference.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl font-black text-teal-700">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-base">Tailor your trip</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our intelligent engine crafts an optimized day-by-day plan with travel times and boutique picks.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl font-black text-indigo-600">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-base">Plan together</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Invite your co-travelers to vote on hotels, add sights, and finalize plans without chaotic group chats.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-black">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-base">Travel</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hit the road with a turnkey live itinerary, interactive maps, expense tracker, and offline support.
            </p>
          </div>
        </div>
      </section>

      {/* Traveler Stories Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block">
            Traveler Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Zero drama, unforgettable journeys
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "We planned a 7-person road trip through Northern Italy. Normally that takes months of argument. With TripTailor, everyone voted in 10 minutes and we were locked in."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="Elena Rossi"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Elena Rossi</h5>
                <p className="text-[11px] text-slate-500 font-medium">Milan to Dolomites • 7 Travelers</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "The AI understood that half our group likes hiking while the other half loves cafes. The daily schedule balanced both without anyone feeling left out."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Marcus Chen"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Marcus Chen</h5>
                <p className="text-[11px] text-slate-500 font-medium">Kyoto Autumn Tour • 4 Travelers</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "Hands down the best group travel software I've touched. Budget tracking alone saved us countless headaches after dinners and bookings."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Sarah Jenkins"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Sarah Jenkins</h5>
                <p className="text-[11px] text-slate-500 font-medium">Bali Coast Escape • 6 Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to plan your next escape? Dark CTA Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="bg-[#111C2D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
              Start in 60 seconds
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to plan your next escape?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join over 45,000 satisfied groups and craft tailored itineraries with zero logistics stress.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
            >
              Plan My Trip Now
            </button>
            <button
              onClick={() => onNavigate('itinerary')}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all"
            >
              View Demo Itinerary
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-auto pt-12 pb-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-teal-300 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">TripTailor</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                AI v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The collaborative travel design workspace for companions who want effortless adventures and shared memories.
            </p>
            <form onSubmit={handleSubscribe} className="pt-2">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                Subscribe for curated itineraries & deals
              </label>
              <div className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg"
                >
                  {subscribed ? 'Joined!' : 'Join'}
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-3 text-[11px]">Product</h5>
            <ul className="space-y-2 text-slate-600">
              <li><button onClick={() => onNavigate('create')} className="hover:text-slate-900">AI Itinerary Builder</button></li>
              <li><button onClick={() => onNavigate('itinerary')} className="hover:text-slate-900">Group Voting Suite</button></li>
              <li><button onClick={() => onNavigate('itinerary')} className="hover:text-slate-900">Budget Calculator</button></li>
              <li><span className="hover:text-slate-900 cursor-pointer">Offline Mobile Mode</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-3 text-[11px]">Popular Guides</h5>
            <ul className="space-y-2 text-slate-600">
              <li><button onClick={() => onNavigate('itinerary')} className="hover:text-slate-900">Goa Beach & Heritage</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900">Amalfi Coast Roadtrip</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900">Tokyo Gastronomy Tour</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900">Reykjavik Winter Escape</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-3 text-[11px]">Company</h5>
            <ul className="space-y-2 text-slate-600">
              <li><span className="hover:text-slate-900 cursor-pointer">About Our Story</span></li>
              <li><span className="hover:text-slate-900 cursor-pointer">Careers <strong className="text-orange-600">(Hiring!)</strong></span></li>
              <li><span className="hover:text-slate-900 cursor-pointer">Press & Media Kit</span></li>
              <li><span className="hover:text-slate-900 cursor-pointer">Security & Privacy</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} TripTailor Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">System Status</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
