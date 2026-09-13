import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Share2,
  Check,
  Utensils,
  ChevronRight,
} from 'lucide-react';
import { ActivityItem, ViewScreen, TripData, UserProfile } from '../types';
import { INITIAL_DAYS, POD_MEMBERS } from '../data/mockData';
import { InteractiveMap } from './InteractiveMap';

interface ItineraryViewProps {
  onNavigate: (screen: ViewScreen) => void;
  onOpenInvite: () => void;
  onOpenReserve: (restaurant: string) => void;
  onOpenBill: () => void;
  onOpenAddActivity: (dayNum: number) => void;
  activitiesList: ActivityItem[];
  setActivitiesList: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
  currentTrip?: TripData;
  user?: UserProfile | null;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onNavigate,
  onOpenInvite,
  onOpenReserve,
  onOpenAddActivity,
  activitiesList,
  setActivitiesList,
  currentTrip,
  user,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeStop, setActiveStop] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const daysData = currentTrip?.days || INITIAL_DAYS;
  const currentDay = daysData[selectedDayIndex] || daysData[0];
  const tripTitle = currentTrip?.title || 'Your Trip Itinerary';
  const tripDestination = currentTrip?.destination || 'Goa, India';
  const tripDates = currentTrip?.dates || '12 Oct – 15 Oct 2025';
  const travelersCount = currentTrip?.travelersCount || 4;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRemoveActivity = (id: string) => {
    setActivitiesList((prev) => prev.filter((a) => a.id !== id));
    showToast('Activity removed');
  };

  const dayActivities = selectedDayIndex === 0 ? activitiesList : currentDay.activities;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Clean Trip Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>{tripDestination}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tripTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{tripDates}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{travelersCount} Travelers</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{daysData.length} Days</span>
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Invite Option - ONLY SHOWN ONCE LOGGED IN & AUTHENTICATED */}
          {user && (
            <button
              onClick={onOpenInvite}
              className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/60 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Invite travel companions"
            >
              <Users className="w-3.5 h-3.5 text-orange-600" />
              <span>Invite</span>
            </button>
          )}

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast('Link copied to clipboard!');
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Share</span>
          </button>

          <button
            onClick={() => onNavigate('create')}
            className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Trip</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {daysData.map((day, idx) => {
          const isActive = selectedDayIndex === idx;
          return (
            <button
              key={day.dayNumber || idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Day {idx + 1}</span>
              <span className="text-[11px] opacity-70 font-normal">
                ({(selectedDayIndex === idx ? dayActivities : day.activities).length} stops)
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Activity Cards + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Clean Activities Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-base font-bold text-slate-900">
              Day {selectedDayIndex + 1}: {currentDay.title}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {dayActivities.length} activities scheduled
            </span>
          </div>

          {/* Activity Cards List */}
          <div className="space-y-3">
            {dayActivities.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <p className="text-sm text-slate-500">No activities planned for this day yet.</p>
                <button
                  onClick={() => onOpenAddActivity(selectedDayIndex + 1)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  + Add First Stop
                </button>
              </div>
            ) : (
              dayActivities.map((activity, idx) => (
                <div
                  key={activity.id}
                  onClick={() => setActiveStop(idx + 1)}
                  className={`bg-white rounded-2xl border p-4 transition-all cursor-pointer flex gap-4 items-start ${
                    activeStop === idx + 1
                      ? 'border-orange-500 ring-2 ring-orange-500/10 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Photo thumbnail */}
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  {/* Activity info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-600">
                            {activity.time}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {activity.duration}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {activity.title}
                        </h3>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveActivity(activity.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                        title="Remove activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <span className="font-semibold text-slate-700">{activity.costInfo}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">★ {activity.rating}</span>
                      </div>

                      {activity.type === 'dining' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenReserve(activity.title);
                          }}
                          className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Utensils className="w-3 h-3" />
                          <span>Reserve</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Stop Button */}
          <button
            onClick={() => onOpenAddActivity(selectedDayIndex + 1)}
            className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Add Activity to Day {selectedDayIndex + 1}</span>
          </button>
        </div>

        {/* Right Column (5 cols): Map & Simple Trip Summary */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          {/* Map view */}
          <InteractiveMap
            activeStop={activeStop}
            onSelectStop={(num) => setActiveStop(num)}
          />

          {/* Clean Trip Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Trip Overview
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-500 block text-[11px]">Total Days</span>
                <span className="text-base font-bold text-slate-900">{daysData.length} Days</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-500 block text-[11px]">Travelers</span>
                <span className="text-base font-bold text-slate-900">{travelersCount} People</span>
              </div>
            </div>

            {/* Travel Companions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Trip Crew</span>
                {user && (
                  <button
                    onClick={onOpenInvite}
                    className="text-orange-600 font-bold hover:text-orange-700 cursor-pointer text-xs flex items-center gap-1"
                  >
                    <span>+ Invite</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {POD_MEMBERS.map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    title={member.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white border border-slate-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
