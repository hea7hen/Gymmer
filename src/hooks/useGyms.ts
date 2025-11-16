import { useQuery } from '@tanstack/react-query';
import { 
  collection, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Gym } from '../types/gym';

export function useGyms(filters?: {
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  gymTypes?: string[];
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'area' | 'newest';
}) {
  return useQuery({
    queryKey: ['gyms', filters],
    queryFn: async () => {
      const constraints: QueryConstraint[] = [];
      
      // Apply filters
      if (filters?.area) {
        console.log('🔍 Filtering by area:', filters.area);
        constraints.push(where('area', '==', filters.area));
      }
      
      // Sorting
      if (filters?.sortBy === 'featured') {
        constraints.push(orderBy('isPremium', 'desc'));
      } else if (filters?.sortBy === 'area') {
        constraints.push(orderBy('area', 'asc'));
      } else if (filters?.sortBy === 'newest') {
        constraints.push(orderBy('createdAt', 'desc'));
      }
      
      const gymsQuery = query(collection(db, 'gyms'), ...constraints);
      const snapshot = await getDocs(gymsQuery);
      
      console.log('📊 Fetched gyms from Firestore:', snapshot.size);
      
      let gyms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gym[];
      
      // Client-side filtering for complex queries
      if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        console.log('💰 Applying price filter:', filters.minPrice, '-', filters.maxPrice);
        const beforeCount = gyms.length;
        
        gyms = gyms.filter(gym => {
          const price = gym.pricing?.monthly;
          
          // If gym has no pricing, only exclude if user set a specific price filter
          // (not the default max range)
          if (!price || price === 0) {
            // Include gyms without pricing unless user specifically filtered
            return filters.maxPrice === undefined || filters.maxPrice >= 9000;
          }
          
          if (filters.minPrice !== undefined && price < filters.minPrice) return false;
          if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
          
          return true;
        });
        
        console.log(`💰 After price filter: ${gyms.length} (filtered out ${beforeCount - gyms.length})`);
      }
      
      if (filters?.amenities && filters.amenities.length > 0) {
        console.log('🏋️ Applying amenity filter:', filters.amenities);
        const beforeCount = gyms.length;
        gyms = gyms.filter(gym => 
          gym.amenities && filters.amenities!.every(amenity => gym.amenities.includes(amenity))
        );
        console.log(`🏋️ After amenity filter: ${gyms.length} (filtered out ${beforeCount - gyms.length})`);
      }
      
      if (filters?.gymTypes && filters.gymTypes.length > 0) {
        console.log('🥊 Applying gym type filter:', filters.gymTypes);
        const beforeCount = gyms.length;
        gyms = gyms.filter(gym => 
          gym.gymTypes && filters.gymTypes!.some(type => gym.gymTypes.includes(type))
        );
        console.log(`🥊 After gym type filter: ${gyms.length} (filtered out ${beforeCount - gyms.length})`);
      }
      
      // Sort by price if specified
      if (filters?.sortBy === 'price-low') {
        gyms.sort((a, b) => (a.pricing?.monthly || Infinity) - (b.pricing?.monthly || Infinity));
      } else if (filters?.sortBy === 'price-high') {
        gyms.sort((a, b) => (b.pricing?.monthly || 0) - (a.pricing?.monthly || 0));
      }
      
      console.log('✅ Final gym count:', gyms.length);
      return gyms;
    },
  });
}

export function useGym(slug: string) {
  return useQuery({
    queryKey: ['gym', slug],
    queryFn: async () => {
      const gymsQuery = query(collection(db, 'gyms'), where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(gymsQuery);
      
      if (snapshot.empty) {
        throw new Error('Gym not found');
      }
      
      const gymDoc = snapshot.docs[0];
      return {
        id: gymDoc.id,
        ...gymDoc.data()
      } as Gym;
    },
  });
}

export function useFeaturedGyms() {
  return useQuery({
    queryKey: ['gyms', 'featured'],
    queryFn: async () => {
      const gymsQuery = query(
        collection(db, 'gyms'), 
        where('isPremium', '==', true),
        limit(6)
      );
      const snapshot = await getDocs(gymsQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gym[];
    },
  });
}

export function useNeighborhoodCounts() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'gyms'));
      const gyms = snapshot.docs.map(doc => doc.data()) as Gym[];
      
      const counts: Record<string, number> = {};
      gyms.forEach(gym => {
        counts[gym.area] = (counts[gym.area] || 0) + 1;
      });
      
      return Object.entries(counts)
        .map(([area, count]) => ({ area, count }))
        .sort((a, b) => b.count - a.count);
    },
  });
}

