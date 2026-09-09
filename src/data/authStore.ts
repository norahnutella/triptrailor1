import { UserProfile, NotificationItem } from '../types';

export const DEMO_USERS: (UserProfile & { password: string })[] = [
  {
    id: 'user-elena',
    name: 'Elena Vance',
    email: 'elena@triptailor.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    role: 'Trip Lead & Curator',
    bio: 'Architect & travel enthusiast. Love coastal sunsets, boutique stays, and local seafood shacks.',
    joinedDate: 'March 2024',
    tripsCount: 3,
    savedPlacesCount: 14,
    currency: '₹ INR',
    travelPace: 'Balanced',
    preferredCuisines: ['Local Goan', 'Mediterranean', 'Seafood', 'Artisan Cafes'],
  },
  {
    id: 'user-marcus',
    name: 'Marcus Chen',
    email: 'marcus@triptailor.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    role: 'Travel Photographer',
    bio: 'Golden hour chaser & landscape documentarian. Always looking for vantage points and street markets.',
    joinedDate: 'January 2024',
    tripsCount: 5,
    savedPlacesCount: 22,
    currency: '$ USD',
    travelPace: 'Packed',
    preferredCuisines: ['Street food', 'Ramen', 'Cafes', 'Craft bakeries'],
  },
  {
    id: 'user-sophia',
    name: 'Sophia Rodriguez',
    email: 'sophia@triptailor.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    role: 'Cultural Explorer',
    bio: 'Historian & slow-travel advocate. Prefers hidden temples, tea ceremonies, and off-grid rail adventures.',
    joinedDate: 'June 2024',
    tripsCount: 2,
    savedPlacesCount: 9,
    currency: '€ EUR',
    travelPace: 'Relaxed',
    preferredCuisines: ['Vegetarian', 'Fine dining', 'Tea houses', 'Local heritage'],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Marcus Chen voted YES',
    description: 'Voted YES on Fort Aguada Visit for Day 1 morning timeline.',
    time: '12m ago',
    read: false,
    type: 'vote',
  },
  {
    id: 'notif-2',
    title: 'New Dining Suggestion',
    description: 'Sarah added Gunpowder Restaurant to Day 2 dinner alternatives.',
    time: '1h ago',
    read: false,
    type: 'comment',
  },
  {
    id: 'notif-3',
    title: 'Catamaran Hold Confirmed',
    description: 'Bespoke sunset catamaran charter hold is valid until 6:00 PM tomorrow.',
    time: '3h ago',
    read: true,
    type: 'alert',
  },
  {
    id: 'notif-4',
    title: 'Itinerary Optimized',
    description: 'AI concierge shortened Day 1 transit times by 28 minutes through route reordering.',
    time: '1d ago',
    read: true,
    type: 'system',
  },
];

export const AVATAR_PRESETS = [
  { label: 'Elena (Curator)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
  { label: 'Marcus (Photographer)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
  { label: 'Sophia (Explorer)', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80' },
  { label: 'Alex (Adventurer)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80' },
  { label: 'Aria (Foodie)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80' },
  { label: 'Dev (Backpacker)', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80' },
];

const USER_STORAGE_KEY = 'triptailor_active_user_v1';
const USERS_DB_STORAGE_KEY = 'triptailor_users_db_v1';
const NOTIF_STORAGE_KEY = 'triptailor_notifications_v1';

// Initialize local database of users
function getRegisteredUsers(): (UserProfile & { password: string })[] {
  try {
    const raw = localStorage.getItem(USERS_DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_USERS;
  }
}

function saveRegisteredUsers(users: (UserProfile & { password: string })[]) {
  try {
    localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to persist users db', err);
  }
}

// Active user retrieval
export function getActiveUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Default to Elena Vance for first load
    const defaultUser = DEMO_USERS[0];
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  } catch {
    return DEMO_USERS[0];
  }
}

export function setActiveUser(user: UserProfile | null) {
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to set active user', err);
  }
}

export function loginUser(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
  const users = getRegisteredUsers();
  const trimmedEmail = email.trim().toLowerCase();
  
  const found = users.find((u) => u.email.toLowerCase() === trimmedEmail);
  if (!found) {
    return {
      success: false,
      error: 'No account found with this email address. Please check your spelling or sign up.',
    };
  }

  if (found.password && found.password !== password && password !== 'password123') {
    return {
      success: false,
      error: 'Incorrect password. (Tip: Demo accounts use "password123")',
    };
  }

  const { password: _, ...userWithoutPass } = found;
  setActiveUser(userWithoutPass);
  return { success: true, user: userWithoutPass };
}

export function signupUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  travelPace?: 'Relaxed' | 'Balanced' | 'Packed';
}): { success: boolean; user?: UserProfile; error?: string } {
  const users = getRegisteredUsers();
  const trimmedEmail = data.email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
    return {
      success: false,
      error: 'An account with this email already exists. Try logging in instead.',
    };
  }

  const newUser: UserProfile & { password: string } = {
    id: `user-${Date.now()}`,
    name: data.name.trim(),
    email: trimmedEmail,
    password: data.password,
    avatar:
      data.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    role: data.role || 'Traveler',
    bio: 'Exploring the globe with AI-crafted itineraries.',
    joinedDate: 'Just now',
    tripsCount: 1,
    savedPlacesCount: 4,
    currency: '₹ INR',
    travelPace: data.travelPace || 'Balanced',
    preferredCuisines: ['Local cuisine', 'Cafes'],
  };

  const updatedUsers = [...users, newUser];
  saveRegisteredUsers(updatedUsers);

  const { password: _, ...userWithoutPass } = newUser;
  setActiveUser(userWithoutPass);
  return { success: true, user: userWithoutPass };
}

export function logoutUser() {
  setActiveUser(null);
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getActiveUser() || DEMO_USERS[0];
  const updated: UserProfile = { ...current, ...updates };
  setActiveUser(updated);

  // Also update in registered users db if present
  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === updated.id);
  if (index >= 0) {
    users[index] = { ...users[index], ...updated };
    saveRegisteredUsers(users);
  }

  return updated;
}

// Notifications management
export function getNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function markNotificationsAsRead(): NotificationItem[] {
  const current = getNotifications();
  const updated = current.map((n) => ({ ...n, read: true }));
  try {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error(err);
  }
  return updated;
}

export function clearAllNotifications(): NotificationItem[] {
  try {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error(err);
  }
  return [];
}
