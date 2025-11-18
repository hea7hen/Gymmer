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
 * Generate a unique gym image based on gym name/area
 * Uses a hash of the name to select from different Unsplash gym images
 */
export function generateGymImage(gymName: string, area?: string): string {
  // Create a simple hash from the gym name
  let hash = 0;
  const str = (gymName + (area || '')).toLowerCase();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Array of gym images - using local images in repeating order
  // Based on the 7 provided gym photos, cycling through them
  const gymImages = [
    '/gym-1.jpg', // Modern gym with large windows and city view
    '/gym-2.jpg', // TRX suspension training area with red rig
    '/gym-3.jpg', // Black and white gym with mirrors and weight benches
    '/gym-4.jpg', // Free weights area with red-ringed dumbbells
    '/gym-5.jpg', // Active gym with people on treadmills
    '/gym-6.jpg', // Functional gym with blue and pink mats
    '/gym-7.jpg', // Modern gym with people running on treadmills
  ];
  
  // Use absolute value of hash to select image
  const index = Math.abs(hash) % gymImages.length;
  return gymImages[index];
}

