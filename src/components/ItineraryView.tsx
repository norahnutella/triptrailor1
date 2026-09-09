import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  CreditCard,
  Clock,
  MapPin,
  Car,
  ChevronRight,
  Share2,
  Download,
  Plus,
  Trash2,
  ThumbsUp,
  Check,
  Send,
  ExternalLink,
  SlidersHorizontal,
  ArrowUpDown,
  Utensils,
  Coffee,
  Bookmark,
  Waves,
  Sun,
  Camera,
  AlertCircle,
} from 'lucide-react';
import { ActivityItem, Collaborator, DayItinerary, PodMessage, ViewScreen } from '../types';
import {
  GOA_TRIP,
  INITIAL_DAYS,
  POD_MEMBERS,
  INITIAL_POD_MESSAGES,
} from '../data/mockData';
import { InteractiveMap } from './InteractiveMap';

interface ItineraryViewProps {
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
  onOpenReserve: (restaurant: string) => void;
  onOpenBill: () => void;
  onOpenAddActivity: (dayNum: number) => void;
  activitiesList: ActivityItem[];
  setActivitiesList: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onNavigate,
  onOpenInvite,
  onOpenReserve,
  onOpenBill,
  onOpenAddActivity,
  activitiesList,
  setActivitiesList,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeStop, setActiveStop] = useState(1);
  const [chatMessages, setChatMessages] = useState<PodMessage[]>(INITIAL_POD_MESSAGES);
  const [newNote, setNewNote] = useState('');
  const [aiSuggestionDismissed, setAiSuggestionDismissed] = useState(false);
  const [aiSuggestionAccepted, setAiSuggestionAccepted] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({
    'act-1': 4,
    'act-2': 3,
    'act-3': 4,
    'act-4': 3,
    'act-5': 4,
  });

  const handleVote = (actId: string) => {
    setVotes((prev) => ({
      ...prev,
      [actId]: (prev[actId] || 3) + 1,
    }));
  };

  const handleRemoveActivity = (id: string) => {
    setActivitiesList((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAcceptOptimization = () => {
    setAiSuggestionAccepted(true);
    // Shift Thalassa reservation from 07:30 PM to 08:00 PM
    setActivitiesList((prev) =>
      prev.map((item) =>
        item.id === 'act-5'
          ? {
              ...item,
              time: '08:00 PM',
              title: '08:00 PM 🍷 Dinner at Thalassa (Vagator Cliffs)',
              highlightNote: 'Adjusted for sunset timing • Booking Hold: 4 Seats',
            }
          : item
      )
    );
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      const msg: PodMessage = {
        id: `note-${Date.now()}`,
        user: 'Elena Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        text: newNote.trim(),
        time: 'Just now',
      };
      setChatMessages((prev) => [...prev, msg]);
      setNewNote('');
    }
  };

  const currentDay = INITIAL_DAYS[selectedDayIndex];

  return (
    <div id="itinerary-view" className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Pod Collaborators Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900 transition-colors">
            My Trips
          </button>
          <span>&gt;</span>
          <span className="hover:text-slate-900 cursor-pointer">West Coast India</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Active Plan</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Overlapping Collaborator Avatars */}
          <div className="flex items-center -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
              alt="Elena"
              className="w-7 h-7 rounded-full border-2 border-white object-cover"
              title="Elena (Viewing)"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
              alt="Anu"
              className="w-7 h-7 rounded-full border-2 border-white object-cover"
              title="Anu (Editing)"
            />
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
              alt="Megha"
              className="w-7 h-7 rounded-full border-2 border-white object-cover"
              title="Megha (Voting)"
            />
            <div
              onClick={onOpenInvite}
              className="w-7 h-7 rounded-full border-2 border-white bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center cursor-pointer hover:bg-slate-800"
            >
              +1
            </div>
          </div>

          <button
            onClick={onOpenInvite}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Itinerary link copied to clipboard!');
            }}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => alert('Exporting full 4-day Goa Adventure itinerary PDF with QR codes and flight vouchers...')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Trip Plan Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left info (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[11px] font-bold text-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>HIGH CONFIDENCE (96% MATCH) • CURATED BY TRIPTAILOR AI V4.2</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Your Goa Adventure
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>12 Oct — 15 Oct 2025</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>4 Travelers</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>₹20,000 Total Budget</span>
              </span>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">BEACH</span>
              <span className="px-2.5 py-1 rounded-md bg-orange-100 text-orange-800">FOOD & SHACKS</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">ADVENTURE</span>
              <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800">BALANCED PACING</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">SCENIC DRIVES</span>
            </div>
          </div>

          {/* Right Expense Tracker Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Est. Group Expense
                </span>
                <p className="text-2xl font-black text-slate-900">₹17,800</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Remaining
                </span>
                <p className="text-lg font-black text-emerald-600">+₹2,200</p>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-200">
                <div className="h-full bg-indigo-600 w-[45%]" title="Stay (45%)"></div>
                <div className="h-full bg-orange-500 w-[28%]" title="Dine (28%)"></div>
                <div className="h-full bg-teal-500 w-[18%]" title="Play (18%)"></div>
                <div className="h-full bg-slate-400 w-[9%]" title="Buffer (9%)"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Stay (45%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Dine (28%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span> Play (18%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> Buffer (9%)
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60 font-semibold">
              <span className="text-slate-600">₹4,450 / person est.</span>
              <button
                onClick={onOpenBill}
                className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 hover:underline"
              >
                <span>Detailed Bill</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        {INITIAL_DAYS.map((day, idx) => {
          const isActive = selectedDayIndex === idx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2.5 rounded-full whitespace-nowrap transition-all flex items-center gap-2 shadow-2xs ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-orange-500' : 'bg-slate-300'
                }`}
              ></span>
              <span>{day.dateStr}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Layout: Timeline + Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Day Timeline Sequence */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Timeline Sequence
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                DAY {selectedDayIndex + 1} — {currentDay.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={handleAcceptOptimization}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-teal-700 flex items-center gap-1"
                title="Auto-optimize schedule"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Optimize</span>
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activities list for selected day */}
          <div className="space-y-4">
            {(selectedDayIndex === 0 ? activitiesList : currentDay.activities).map((activity, idx) => (
              <div key={activity.id} className="space-y-3">
                {/* Activity Card */}
                <div
                  onClick={() => setActiveStop(idx + 1)}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all shadow-2xs hover:shadow-xs relative ${
                    activeStop === idx + 1
                      ? 'border-slate-400 ring-2 ring-slate-900/10'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Left badges & photo */}
                    <div className="flex sm:flex-col items-center sm:items-start gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${
                            activity.categoryTag === 'LUNCH'
                              ? 'bg-orange-600'
                              : 'bg-slate-900'
                          }`}
                        >
                          {activity.orderNumber || idx + 1}
                        </div>

                        {activity.categoryTag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                            {activity.categoryTag}
                          </span>
                        )}

                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {activity.duration}
                        </span>
                      </div>

                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-24 sm:w-28 h-20 sm:h-20 rounded-xl object-cover mt-1"
                      />
                    </div>

                    {/* Right details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-slate-900">{activity.title}</h3>
                            {activity.isTopPick && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md">
                                <Sparkles className="w-3 h-3 text-teal-600" />
                                <span>TOP AI PICK</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                            {activity.description}
                          </p>
                        </div>
                      </div>

                      {/* Meta line: Cost, Rating, Weather / Highlight */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="font-bold text-slate-800">{activity.costInfo}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold flex items-center gap-1">
                          ★ {activity.rating} ({activity.reviewCount})
                        </span>
                        <span>•</span>
                        <span className="text-teal-700 font-semibold">{activity.highlightNote}</span>
                      </div>

                      {/* Tags & Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <div className="flex flex-wrap gap-1.5">
                          {activity.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          {/* Vote Thumbs */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(activity.id);
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 text-[11px]"
                            title="Vote for this activity"
                          >
                            <ThumbsUp className="w-3 h-3 text-orange-600" />
                            <span>{votes[activity.id] || 4}</span>
                          </button>

                          {/* Reserve Table button for dining */}
                          {activity.type === 'dining' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenReserve(activity.title);
                              }}
                              className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1"
                            >
                              <Utensils className="w-3 h-3" />
                              <span>Reserve Table</span>
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const newTime = prompt('Enter new scheduled time:', activity.time);
                              if (newTime) {
                                setActivitiesList((prev) =>
                                  prev.map((a) =>
                                    a.id === activity.id ? { ...a, time: newTime } : a
                                  )
                                );
                              }
                            }}
                            className="text-slate-600 hover:text-slate-900 font-semibold px-2 py-1"
                          >
                            Edit Time
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveActivity(activity.id);
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Remove from itinerary"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transit interval between stops */}
                {activity.transitAfter && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-100/80 rounded-xl border border-slate-200/70 text-xs font-semibold text-slate-600">
                    <Car className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{activity.transitAfter.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Activity Button */}
          <div className="pt-2">
            <button
              onClick={() => onOpenAddActivity(selectedDayIndex + 1)}
              className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <Plus className="w-4 h-4 text-slate-500" />
              <span>+ Add Activity to Day {selectedDayIndex + 1}</span>
            </button>
          </div>
        </div>

        {/* Right Column (4 cols): Interactive Map, AI Assistant, Pod Chat */}
        <div className="lg:col-span-4 space-y-5 sticky top-20">
          {/* North Goa Route Map */}
          <InteractiveMap
            activeStop={activeStop}
            onSelectStop={(num) => setActiveStop(num)}
          />

          {/* Intelligent Assistant Optimization Box */}
          {!aiSuggestionDismissed && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm space-y-3 border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>TripTailor Intelligent Assistant</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-900 text-teal-300 px-2 py-0.5 rounded-full">
                  Optimization
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {aiSuggestionAccepted ? (
                  <span className="text-teal-300 font-semibold">
                    ✓ Optimization applied! Shifted Thalassa Vagator dinner to 08:00 PM. Sunset viewing window maximized from Baga Beach!
                  </span>
                ) : (
                  'Would you like to shift the Thalassa Vagator dinner reservation 30 mins later (to 08:00 PM)? You will catch the full cliffside sunset at Vagator without rushing from Baga Beach!'
                )}
              </p>

              {!aiSuggestionAccepted ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleAcceptOptimization}
                    className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    Accept Adjustment
                  </button>
                  <button
                    onClick={() => setAiSuggestionDismissed(true)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
                  >
                    Dismiss
                  </button>
                </div>
              ) : (
                <div className="text-[11px] text-teal-400 font-semibold pt-1">
                  Syncing updated hold with Thalassa Host Stand...
                </div>
              )}
            </div>
          )}

          {/* Collaborative Pod (4 Members) Live Sync Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-700" />
                <span className="font-bold text-xs text-slate-900">Collaborative Pod (4 Members)</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Sync Live</span>
              </span>
            </div>

            {/* Members Presence List */}
            <div className="space-y-2.5">
              {POD_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <span
                        className="absolute bottom-0 right-0 w-2 h-2 rounded-full ring-1 ring-white"
                        style={{ backgroundColor: member.color }}
                      ></span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block leading-none">{member.name}</span>
                      <span className="text-[10px] text-slate-500">{member.currentAction}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      member.status === 'EDITING'
                        ? 'bg-orange-100 text-orange-800'
                        : member.status === 'VIEWING'
                        ? 'bg-teal-100 text-teal-800'
                        : member.status === 'VOTING'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat/Note history */}
            <div className="pt-2 border-t border-slate-100 space-y-2 max-h-40 overflow-y-auto pr-1 text-xs">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{msg.user}</span>
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Quick comment input */}
            <form onSubmit={handleSendNote} className="pt-1 flex gap-2">
              <input
                type="text"
                placeholder="Drop a note or suggest a spot..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-slate-400"
              />
              <button
                type="submit"
                className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
                aria-label="Send note"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
