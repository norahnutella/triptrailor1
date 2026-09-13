import { GroupMessage, Collaborator, UserProfile, NotificationItem } from '../types';
import { POD_MEMBERS } from './mockData';

const GROUP_MESSAGES_KEY = 'triptailor_group_messages_v2';
const NOTIF_STORAGE_KEY = 'triptailor_notifications_v1';

// Initial realistic squad discussion messages
const INITIAL_GROUP_MESSAGES: GroupMessage[] = [
  {
    id: 'msg-seed-1',
    tripId: 'goa-trip',
    senderId: 'user-sarah',
    senderName: 'Sarah Khan',
    senderAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
    senderRole: 'Member',
    text: "Hey squad! I checked out Gunpowder Restaurant in Assagao — the prawn balchão and appams are supposed to be out of this world.",
    timestamp: Date.now() - 3600 * 1000 * 3, // 3 hours ago
    timeFormatted: '11:15 AM',
    readBy: ['user-sarah', 'user-elena'],
    tag: 'dining',
  },
  {
    id: 'msg-seed-2',
    tripId: 'goa-trip',
    senderId: 'user-anu',
    senderName: 'Anu Sharma',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    senderRole: 'Co-planner',
    text: "Totally agree! I'll put it on our Day 2 lunch slot. Also, should we do the Fort Aguada walk early around 9 AM to avoid the coastal heat?",
    timestamp: Date.now() - 3600 * 1000 * 2, // 2 hours ago
    timeFormatted: '12:30 PM',
    readBy: ['user-anu', 'user-elena'],
    tag: 'itinerary',
  },
  {
    id: 'msg-seed-3',
    tripId: 'goa-trip',
    senderId: 'user-megha',
    senderName: 'Megha Roy',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    senderRole: 'Member',
    text: "9 AM at Fort Aguada works perfectly for me. Don't forget sunscreen and sneakers for the rocky overlook!",
    timestamp: Date.now() - 3600 * 1000 * 1, // 1 hour ago
    timeFormatted: '01:45 PM',
    readBy: ['user-megha', 'user-elena'],
    tag: 'general',
  },
  {
    id: 'msg-seed-4',
    tripId: 'goa-trip',
    senderId: 'user-elena',
    senderName: 'Elena Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    senderRole: 'Trip Lead',
    text: "Great coordination team! I've updated our timeline stops. Let's make sure everyone has their flights/trains logged.",
    timestamp: Date.now() - 60 * 1000 * 25, // 25 mins ago
    timeFormatted: '02:20 PM',
    readBy: ['user-elena'],
    tag: 'itinerary',
  },
];

/**
 * Retrieve all group messages for the given trip
 */
export function getGroupMessages(tripId: string = 'goa-trip'): GroupMessage[] {
  try {
    const raw = localStorage.getItem(GROUP_MESSAGES_KEY);
    if (!raw) {
      localStorage.setItem(GROUP_MESSAGES_KEY, JSON.stringify(INITIAL_GROUP_MESSAGES));
      return INITIAL_GROUP_MESSAGES;
    }
    const all: GroupMessage[] = JSON.parse(raw);
    const filtered = all.filter((m) => !m.tripId || m.tripId === tripId);
    return filtered.sort((a, b) => a.timestamp - b.timestamp);
  } catch (err) {
    console.error('Failed to get group messages', err);
    return INITIAL_GROUP_MESSAGES;
  }
}

/**
 * Send a new group message
 */
export function sendGroupMessage(params: {
  tripId?: string;
  sender: UserProfile;
  text: string;
  tag?: 'itinerary' | 'dining' | 'general' | 'urgent';
}): GroupMessage {
  const tripId = params.tripId || 'goa-trip';
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMessage: GroupMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    tripId,
    senderId: params.sender.id,
    senderName: params.sender.name,
    senderAvatar: params.sender.avatar,
    senderRole: params.sender.role,
    text: params.text.trim(),
    timestamp: Date.now(),
    timeFormatted,
    readBy: [params.sender.id], // Sender has read it
    tag: params.tag || 'general',
  };

  try {
    const raw = localStorage.getItem(GROUP_MESSAGES_KEY);
    const existing: GroupMessage[] = raw ? JSON.parse(raw) : INITIAL_GROUP_MESSAGES;
    const updated = [...existing, newMessage];
    localStorage.setItem(GROUP_MESSAGES_KEY, JSON.stringify(updated));

    // Also dispatch in-app notification for other group members
    try {
      const notifRaw = localStorage.getItem(NOTIF_STORAGE_KEY);
      const currentNotifs: NotificationItem[] = notifRaw ? JSON.parse(notifRaw) : [];
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Message from ${params.sender.name}`,
        description: `"${params.text.length > 50 ? params.text.slice(0, 47) + '...' : params.text}" in Trip Squad`,
        time: 'Just now',
        read: false,
        type: 'comment',
      };
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify([newNotif, ...currentNotifs.slice(0, 15)]));
    } catch {
      // ignore
    }

    // Trigger local events for reactive cross-component state updates
    window.dispatchEvent(new CustomEvent('triptailor_group_message', { detail: newMessage }));
    window.dispatchEvent(new Event('triptailor_unread_update'));
  } catch (err) {
    console.error('Failed to send group message', err);
  }

  return newMessage;
}

/**
 * Mark messages as read by a specific user
 */
export function markGroupMessagesAsRead(tripId: string, userId: string): void {
  if (!userId) return;
  try {
    const raw = localStorage.getItem(GROUP_MESSAGES_KEY);
    if (!raw) return;
    const messages: GroupMessage[] = JSON.parse(raw);
    let changed = false;

    const updated = messages.map((msg) => {
      if ((!msg.tripId || msg.tripId === tripId) && !msg.readBy.includes(userId)) {
        changed = true;
        return {
          ...msg,
          readBy: [...msg.readBy, userId],
        };
      }
      return msg;
    });

    if (changed) {
      localStorage.setItem(GROUP_MESSAGES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('triptailor_unread_update'));
    }
  } catch (err) {
    console.error('Failed to mark group messages as read', err);
  }
}

/**
 * Count unread messages for a specific user in this trip
 */
export function getUnreadGroupMessageCount(tripId: string = 'goa-trip', userId?: string | null): number {
  if (!userId) return 0;
  try {
    const messages = getGroupMessages(tripId);
    return messages.filter((m) => !m.readBy.includes(userId)).length;
  } catch {
    return 0;
  }
}

/**
 * Flexible helper that counts unread messages
 */
export function getUnreadGroupMessagesCount(userIdOrTripId?: string | null, maybeUserId?: string | null): number {
  if (maybeUserId !== undefined) {
    return getUnreadGroupMessageCount(userIdOrTripId || 'goa-trip', maybeUserId);
  }
  // Called with just (userId)
  return getUnreadGroupMessageCount('goa-trip', userIdOrTripId);
}

/**
 * Get all squad members for the trip, including active user
 */
export function getSquadMembers(currentUser?: UserProfile | null): Collaborator[] {
  const members = [...POD_MEMBERS];
  if (currentUser) {
    const exists = members.some((m) => m.id === currentUser.id || m.name.toLowerCase() === currentUser.name.toLowerCase());
    if (!exists) {
      members.push({
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role || 'Member',
        status: 'VIEWING',
        currentAction: 'Active in session',
        color: '#0D9488',
      });
    }
  }
  return members;
}
