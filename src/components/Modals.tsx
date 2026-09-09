import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Sparkles,
  Users,
  Send,
  CreditCard,
  Plus,
  Compass,
} from 'lucide-react';
import { ActivityItem } from '../types';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteFriendsModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState<string[]>(['megha.roy@example.com', 'anu.sharma@example.com', 'sarah.k@example.com']);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText('https://triptailor.app/pod/goa-oct2025-pod78');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setInvitedEmails([...invitedEmails, email.trim()]);
      setEmail('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Invite Travel Companions</h3>
              <p className="text-xs text-slate-500">Co-plan, vote on activities & split expenses</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5 uppercase tracking-wider">
              Shareable Pod Link
            </label>
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <input
                readOnly
                value="https://triptailor.app/pod/goa-oct2025-pod78"
                className="bg-transparent text-xs text-slate-700 w-full outline-hidden font-mono"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center gap-1 shrink-0 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <form onSubmit={handleAdd}>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5 uppercase tracking-wider">
              Invite by Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Send
              </button>
            </div>
          </form>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Active Squad Members ({invitedEmails.length + 1})
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs py-1.5 px-2 bg-teal-50/70 border border-teal-100 rounded-lg">
                <span className="font-medium text-slate-800">Elena Vance (You)</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white px-2 py-0.5 rounded-full">Trip Lead</span>
              </div>
              {invitedEmails.map((em, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-2 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-slate-700 font-medium truncate max-w-[200px]">{em}</span>
                  <span className="text-[10px] text-slate-500">Collaborator</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export const ReserveTableModal: React.FC<ReserveModalProps> = ({
  isOpen,
  onClose,
  restaurantName,
}) => {
  const [reserved, setReserved] = useState(false);
  const [guests, setGuests] = useState('4 Guests');
  const [time, setTime] = useState('07:30 PM');

  if (!isOpen) return null;

  const handleConfirm = () => {
    setReserved(true);
    setTimeout(() => {
      setReserved(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Reserve at {restaurantName}</h3>
              <p className="text-xs text-slate-500">TripTailor Direct Concierge Booking</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {reserved ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Table Confirmed!</h4>
            <p className="text-sm text-slate-600">
              Reserved for {guests} at {time} on Oct 12. Instant confirmation sent to all 4 co-travelers.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
              ⚡ <strong>High Demand Window:</strong> Sunset seating between 6:30 PM and 8:00 PM fills fast. Table hold guaranteed for 15 minutes.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Party Size</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8 Guests</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Seating Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option>01:30 PM (Lunch)</option>
                  <option>07:00 PM (Sunset)</option>
                  <option>07:30 PM</option>
                  <option>08:00 PM (Post-Sunset)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Special Requests</label>
              <input
                type="text"
                defaultValue="Cliffside outdoor table with sunset view, vegetarian options"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 bg-slate-50"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-xs rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs"
              >
                Confirm Reservation Hold
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface DetailedBillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailedBillModal: React.FC<DetailedBillModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Detailed Expense Breakdown</h3>
              <p className="text-xs text-slate-500">Goa Coastal Gateway • 4 Pax</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Est. Group Expense</span>
              <p className="text-2xl font-black text-slate-900">₹17,800</p>
              <span className="text-xs text-slate-500">Target Budget: ₹20,000</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Surplus Buffer</span>
              <p className="text-2xl font-black text-emerald-600">+₹2,200</p>
              <span className="text-xs text-slate-500">₹4,450 / person est.</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Category Breakdown</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                  <span className="font-semibold text-slate-800">Accommodation & Stays (45%)</span>
                </div>
                <span className="font-bold text-slate-900">₹8,010</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="font-semibold text-slate-800">Dining & Shacks (28%)</span>
                </div>
                <span className="font-bold text-slate-900">₹4,984</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                  <span className="font-semibold text-slate-800">Activities & Water Sports (18%)</span>
                </div>
                <span className="font-bold text-slate-900">₹3,204</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                  <span className="font-semibold text-slate-800">Local Cabs & Buffer (9%)</span>
                </div>
                <span className="font-bold text-slate-900">₹1,602</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/60 text-xs text-teal-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Split bills synced in real time across all 4 Pod member bank cards.</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl"
          >
            Close Bill
          </button>
        </div>
      </div>
    </div>
  );
};

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: ActivityItem) => void;
  dayNumber: number;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  dayNumber,
}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('02:00 PM');
  const [duration, setDuration] = useState('1.5 HRS');
  const [cost, setCost] = useState('₹500 for group');
  const [tag, setTag] = useState('Sightseeing');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newActivity: ActivityItem = {
      id: `custom-act-${Date.now()}`,
      orderNumber: 6,
      time,
      duration,
      title,
      type: 'activity',
      description: description || 'Custom scheduled stop curated for the group.',
      costInfo: cost,
      rating: 4.8,
      reviewCount: '150',
      highlightNote: 'Added by Elena',
      tags: [tag, 'Custom Stop'],
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    };

    onAdd(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Add Activity to Day {dayNumber}</h3>
              <p className="text-xs text-slate-500">Insert waypoint into timeline</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Activity or Spot Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Chapora Fort Sunset, Curlies Shack, Kayaking"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Cost Info</label>
              <input
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                <option>Sightseeing</option>
                <option>Dining</option>
                <option>Beach Relax</option>
                <option>Water Sports</option>
                <option>Nightlife</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Notes / Description</label>
            <textarea
              rows={2}
              placeholder="Why this spot is recommended for the squad..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Add to Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConciergeModal: React.FC<AiConciergeModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello Elena! I'm TripTailor's Autonomous Travel Concierge. I've optimized your 4-day Goa itinerary with crowd-aware scheduling and low-tide beach windows. What would you like to tweak, check, or explore?",
    },
  ]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    setTimeout(() => {
      let reply = "I have reviewed your trip parameters. Based on your squad's moderate budget and seafood cravings, I recommend swapping any crowded shacks for Fisherman's Wharf or Britto's at 6 PM for optimum sunset lighting.";
      if (userText.toLowerCase().includes('flight') || userText.toLowerCase().includes('airport')) {
        reply = "Flights to Goa (GOI / GOX) are currently stable. The dynamic flight oracle predicts an 8% drop for mid-week return flights.";
      } else if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('cost')) {
        reply = "Your group budget sits comfortably at ₹17,800 spent out of ₹20,000 allocated, leaving an extra ₹2,200 safety buffer for spontaneous boat rentals!";
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 flex flex-col h-[520px]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-base">TripTailor AI Concierge</h3>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full">v4.2</span>
              </div>
              <p className="text-xs text-slate-500">Autonomous routing & group concierge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  TT
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-orange-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick query pills */}
        <div className="py-2 flex gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => {
              setQuery('Suggest sunset beach shacks near Vagator');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0"
          >
            🌅 Vagator sunset spots
          </button>
          <button
            onClick={() => {
              setQuery('Can we fit scuba diving on Day 2?');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0"
          >
            🤿 Scuba diving feasibility
          </button>
          <button
            onClick={() => {
              setQuery('How is our remaining budget looking?');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0"
          >
            💳 Budget check
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="pt-2 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            placeholder="Ask AI concierge to adjust timeline, suggest dining..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};
