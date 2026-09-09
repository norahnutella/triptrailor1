/**
 * TRIPTAILOR DATA MODELS
 * ----------------------------------------------------
 * These TypeScript interfaces define the core data contracts 
 * for the application:
 * 
 * 1. ViewScreen   - The active top-level screen/route
 * 2. ActivityItem - A single stop on a trip timeline (sight, meal, beach, etc.)
 * 3. DayItinerary - A container grouping activities for a specific date
 * 4. Collaborator - Squad member status in the collaborative pod
 * 5. PodMessage   - Chat / note messages shared by travelers
 * 6. TripData     - Top-level trip metadata (budget, destination, dates)
 */

// Active view in the application
export type ViewScreen = 'landing' | 'dashboard' | 'create' | 'itinerary';

// A single planned activity or waypoint in an itinerary
export interface ActivityItem {
  id: string;
  orderNumber: number;
  time: string;
  duration: string;
  title: string;
  type: 'visit' | 'beach' | 'dining' | 'activity' | 'drive';
  categoryTag?: string; // e.g. 'LUNCH'
  isTopPick?: boolean;
  description: string;
  costInfo: string;
  rating: number;
  reviewCount: string;
  highlightNote: string;
  tags: string[];
  image: string;
  status?: 'confirmed' | 'booked' | 'hold' | 'pending';
  transitAfter?: {
    duration: string;
    distance: string;
    label: string;
  };
}

// Grouping of activities for a single day
export interface DayItinerary {
  dayNumber: number;
  dateStr: string;
  title: string;
  activities: ActivityItem[];
}

// Co-traveler profile and live collaborative presence
export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status: 'VIEWING' | 'EDITING' | 'VOTING' | 'IDLE';
  currentAction: string;
  color: string;
}

// Pod chat note
export interface PodMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

// Overall trip specification
export interface TripData {
  id: string;
  title: string;
  destination: string;
  dates: string;
  daysCount: number;
  travelersCount: number;
  budgetTotal: number;
  budgetPerPerson: number;
  budgetTier: 'Budget' | 'Moderate' | 'Premium' | 'Luxury';
  tags: string[];
  days: DayItinerary[];
}

// User Profile for Authentication & Account Settings
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio?: string;
  joinedDate?: string;
  tripsCount: number;
  savedPlacesCount: number;
  currency: string;
  travelPace: 'Relaxed' | 'Balanced' | 'Packed';
  preferredCuisines?: string[];
  isGuest?: boolean;
}

// In-app notifications
export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'vote' | 'invite' | 'comment' | 'alert' | 'system';
}

