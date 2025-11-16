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

