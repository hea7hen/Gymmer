import { Timestamp } from 'firebase/firestore';

export interface Subscription {
  userId: string;
  planType: 'monthly' | 'annual';
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: 'created' | 'paid' | 'failed';
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Access',
    price: 99,
    duration: 'monthly',
    features: [
      'Access to all 70+ gym listings',
      'Compare prices and amenities',
      'Save favorite gyms',
      'Contact gym owners directly',
      'Valid for 30 days',
    ],
  },
  {
    id: 'annual',
    name: 'Annual Access',
    price: 999,
    duration: 'annual',
    popular: true,
    features: [
      'Access to all 70+ gym listings',
      'Compare prices and amenities',
      'Save unlimited favorite gyms',
      'Contact gym owners directly',
      'Valid for 365 days',
      'Save ₹189 (16% off)',
      'Priority customer support',
    ],
  },
];

