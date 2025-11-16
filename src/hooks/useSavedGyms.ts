import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { Gym } from '../types/gym';

export function useSavedGyms() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const savedGymsQuery = useQuery({
    queryKey: ['savedGyms', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const userDoc = await getDoc(doc(db, 'users', user.id));
      const savedGymIds = userDoc.data()?.savedGyms || [];
      
      // Fetch all saved gyms
      const gyms: Gym[] = [];
      for (const gymId of savedGymIds) {
        const gymDoc = await getDoc(doc(db, 'gyms', gymId));
        if (gymDoc.exists()) {
          gyms.push({ id: gymDoc.id, ...gymDoc.data() } as Gym);
        }
      }
      
      return gyms;
    },
    enabled: !!user,
  });

  const saveGym = useMutation({
    mutationFn: async (gymId: string) => {
      if (!user) throw new Error('Must be logged in to save gyms');
      
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        savedGyms: arrayUnion(gymId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedGyms', user?.id] });
    },
  });

  const unsaveGym = useMutation({
    mutationFn: async (gymId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        savedGyms: arrayRemove(gymId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedGyms', user?.id] });
    },
  });

  const isSaved = (gymId: string) => {
    return savedGymsQuery.data?.some(gym => gym.id === gymId) || false;
  };

  return {
    savedGyms: savedGymsQuery.data || [],
    isLoading: savedGymsQuery.isLoading,
    saveGym: saveGym.mutate,
    unsaveGym: unsaveGym.mutate,
    isSaved,
  };
}

