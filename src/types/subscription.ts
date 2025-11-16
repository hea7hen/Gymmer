import { Timestamp } from 'firebase/firestore';

export interface Subscription {
  userId: string;
  planType: 'lifetime';
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: 'created' | 'paid' | 'failed';
  purchaseDate: Timestamp;
  createdAt: Timestamp;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: 'lifetime';
  features: string[];
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    price: 10,
    duration: 'lifetime',
    popular: true,
    features: [
      'One-time payment of ₹10',
      'Unlimited lifetime access',
      'Access to all 70+ gym listings',
      'Compare prices and amenities',
      'Save unlimited favorite gyms',
      'Contact gym owners directly',
      'No recurring charges',
      'Priority customer support',
    ],
  },
];

