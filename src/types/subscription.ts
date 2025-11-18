import { Timestamp } from 'firebase/firestore';

export interface Subscription {
  userId: string;
  planType: 'monthly' | 'yearly' | 'lifetime';
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: 'created' | 'paid' | 'failed';
  purchaseDate: Timestamp;
  expiresAt?: Timestamp; // For monthly and yearly plans
  createdAt: Timestamp;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice?: number;
  duration: 'monthly' | 'yearly' | 'lifetime';
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  isPopular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9,
    duration: 'monthly',
    period: 'month',
    description: 'Perfect for trying out our platform',
    buttonText: 'Get Started',
    features: [
      'Access to all 90+ gym listings',
      'Compare prices and amenities',
      'Save unlimited favorite gyms',
      'Contact gym owners directly',
      'Cancel anytime',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 29,
    yearlyPrice: 29,
    duration: 'yearly',
    period: 'year',
    description: 'Best value - Save 73% compared to monthly',
    buttonText: 'Get Started',
    isPopular: true,
    features: [
      'Access to all 90+ gym listings',
      'Compare prices and amenities',
      'Save unlimited favorite gyms',
      'Contact gym owners directly',
      'Save 73% vs monthly plan',
      'Priority customer support',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 69,
    duration: 'lifetime',
    period: 'lifetime',
    description: 'One-time payment, never pay again',
    buttonText: 'Get Started',
    features: [
      'Unlimited lifetime access',
      'Access to all 90+ gym listings',
      'Compare prices and amenities',
      'Save unlimited favorite gyms',
      'Contact gym owners directly',
      'No recurring charges',
      'Priority customer support',
      'All future features included',
    ],
  },
];

