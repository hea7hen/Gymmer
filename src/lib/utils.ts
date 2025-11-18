import clsx from 'clsx';

export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return clsx(inputs);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'N/A';
  return `₹${price.toLocaleString('en-IN')}`;
}

export function calculateSavings(monthly: number | null, discounted: number | null, months: number): number | null {
  if (!monthly || !discounted) return null;
  return (monthly * months) - discounted;
}

export function getAmenityIcon(amenityId: string): string {
  const icons: Record<string, string> = {
    weights: '🏋️',
    cardio: '🏃',
    ac: '❄️',
    lockers: '🔒',
    showers: '🚿',
    parking: '🅿️',
    personal_training: '👤',
    functional_training: '🤸',
    boxing: '🥊',
    yoga: '🧘',
    steam: '💨',
    swimming: '🏊',
  };
  return icons[amenityId] || '✓';
}

export function getAmenityLabel(amenityId: string): string {
  const labels: Record<string, string> = {
    weights: 'Free Weights',
    cardio: 'Cardio Equipment',
    ac: 'Air Conditioning',
    lockers: 'Lockers',
    showers: 'Showers',
    parking: 'Parking',
    personal_training: 'Personal Training',
    functional_training: 'Functional Training',
    boxing: 'Boxing/MMA',
    yoga: 'Yoga/Pilates',
    steam: 'Steam Room',
    swimming: 'Swimming Pool',
  };
  return labels[amenityId] || amenityId;
}

/**
 * Generate a unique gym image based on gym ID/name/area
 * Uses a hash of the ID to ensure each gym gets a unique image
 */
export function generateGymImage(gymId: string, gymName?: string, area?: string): string {
  // Create a more robust hash from the gym ID (which is unique)
  // Using djb2 hash algorithm for better distribution
  let hash = 5381;
  const str = (gymId + (gymName || '') + (area || '')).toLowerCase();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  
  // Array of gym images - using local webp images in repeating order
  // Using gym-1.webp through gym-9.webp
  const gymImages = [
    '/gym-1.webp',
    '/gym-2.webp',
    '/gym-3.webp',
    '/gym-4.webp',
    '/gym-5.webp',
    '/gym-6.webp',
    '/gym-7.webp',
    '/gym-8.webp',
    '/gym-9.webp',
  ];
  
  // Use absolute value of hash to select image
  const index = Math.abs(hash) % gymImages.length;
  return gymImages[index];
}

