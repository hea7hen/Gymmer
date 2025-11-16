import { Timestamp } from 'firebase/firestore';

export interface Gym {
  id: string;
  name: string;
  slug: string;
  
  // Location
  area: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Contact
  phone: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  website?: string;
  
  // Pricing
  pricing: {
    monthly: number | null;
    quarterly: number | null;
    annual: number | null;
  };
  
  // Features
  amenities: string[];
  gymTypes: string[];
  
  // Media
  images: string[];
  coverImage: string;
  
  // Metadata
  isVerified: boolean;
  isPremium: boolean;
  rating: number;
  
  // Hours
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  // Description
  description: string;
  
  // Tracking
  viewCount: number;
  contactClickCount: number;
  
  // Source tracking
  source: string;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface CSVGym {
  GymName: string;
  Neighborhood: string;
  Address: string;
  MonthlyPrice: string;
  QuarterlyPrice: string;
  YearlyPrice: string;
  Notes: string;
  Source: string;
}

export const AMENITIES = [
  { id: 'weights', label: 'Free Weights', icon: '🏋️' },
  { id: 'cardio', label: 'Cardio Equipment', icon: '🏃' },
  { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
  { id: 'lockers', label: 'Lockers', icon: '🔒' },
  { id: 'showers', label: 'Showers', icon: '🚿' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'personal_training', label: 'Personal Training', icon: '👤' },
  { id: 'functional_training', label: 'Functional Training', icon: '🤸' },
  { id: 'boxing', label: 'Boxing/MMA', icon: '🥊' },
  { id: 'yoga', label: 'Yoga/Pilates', icon: '🧘' },
  { id: 'steam', label: 'Steam Room', icon: '💨' },
  { id: 'swimming', label: 'Swimming Pool', icon: '🏊' },
];

export const GYM_TYPES = [
  { id: 'general', label: 'General Fitness' },
  { id: 'crossfit', label: 'CrossFit' },
  { id: 'boxing', label: 'Boxing/MMA' },
  { id: 'ladies_only', label: 'Ladies Only' },
  { id: 'yoga', label: 'Yoga Studio' },
  { id: 'functional', label: 'Functional Training' },
];

