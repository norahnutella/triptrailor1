export type ViewScreen = 'landing' | 'dashboard' | 'create' | 'itinerary';

export interface ActivityItem {
  id: string;
  orderNumber: number;
  time: string;
  duration: string;
  title: string;
  type: 'visit' | 'beach' | 'dining' | 'activity' | 'drive';
  categoryTag?: string; // 'LUNCH', etc.
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

export interface DayItinerary {
  dayNumber: number;
  dateStr: string;
  title: string;
  activities: ActivityItem[];
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status: 'VIEWING' | 'EDITING' | 'VOTING' | 'IDLE';
  currentAction: string;
  color: string;
}

export interface PodMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

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
