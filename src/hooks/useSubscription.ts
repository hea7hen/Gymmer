import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { Subscription } from '../types/subscription';

export function useSubscription() {
  const { user } = useAuth();

  const subscriptionQuery = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const q = query(
        collection(db, 'subscriptions'),
        where('userId', '==', user.id),
        where('status', '==', 'paid'),
        limit(1)
      );

      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;

      const subscription = {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
      } as Subscription & { id: string };

      // Check if subscription has expired (for monthly and yearly plans)
      if (subscription.expiresAt && subscription.planType !== 'lifetime') {
        const now = new Date();
        const expiresAt = subscription.expiresAt.toDate();
        if (now > expiresAt) {
          // Subscription has expired
          return null;
        }
      }

      return subscription;
    },
    enabled: !!user,
  });

  const hasActiveSubscription = !!subscriptionQuery.data;
  const isAdmin = user?.isAdmin || false;
  const hasAccess = hasActiveSubscription || isAdmin;

  return {
    subscription: subscriptionQuery.data,
    hasActiveSubscription,
    hasAccess,
    isLoading: subscriptionQuery.isLoading,
  };
}

