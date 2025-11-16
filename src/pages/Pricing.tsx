import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { PRICING_PLANS, PricingPlan } from '../types/subscription';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const { user } = useAuth();
  const { hasActiveSubscription, subscription } = useSubscription();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (hasActiveSubscription) {
      alert('You already have an active subscription!');
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setLoading(plan.id);

    try {
      // Create subscription record in Firestore
      const subscriptionRef = await addDoc(collection(db, 'subscriptions'), {
        userId: user.id,
        planType: 'lifetime' as const,
        amount: plan.price,
        status: 'created' as const,
        purchaseDate: Timestamp.now(),
        createdAt: Timestamp.now(),
      });

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: plan.price * 100, // Amount in paise
        currency: 'INR',
        name: 'Gymmer',
        description: `${plan.name} - ${plan.duration}`,
        image: '/logo.svg',
        handler: async function (response: any) {
          try {
            // Update subscription with payment details
            await updateDoc(doc(db, 'subscriptions', subscriptionRef.id), {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id || '',
              razorpaySignature: response.razorpay_signature || '',
              status: 'paid',
            });

            alert('Payment successful! You now have access to all gyms.');
            navigate('/search');
          } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Payment received but there was an error. Please contact support.');
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
        },
        theme: {
          color: '#FF8C42',
        },
        modal: {
          ondismiss: function () {
            setLoading(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(null);
    }
  };

  if (hasActiveSubscription && subscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            You Have Active Subscription!
          </h1>
          <p className="text-gray-600 mb-2">
            Plan: <span className="font-semibold">Lifetime Access</span>
          </p>
          <p className="text-gray-600 mb-8">
            Purchased: <span className="font-semibold">{subscription.purchaseDate.toDate().toLocaleDateString()}</span>
          </p>
          <button
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            Browse Gyms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extra-bold text-gray-900 mb-4">
            Get Lifetime Access
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            One-time payment of just ₹10 for unlimited lifetime access to 70+ verified gyms across Bangalore!
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'border-4 border-primary' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-6xl font-extra-bold text-primary">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2 text-xl">only</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">
                  🎉 One-time payment, lifetime access!
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.id || !razorpayLoaded}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-dark text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : !razorpayLoaded ? (
                  'Loading...'
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">🔒 Secure payment powered by Razorpay</p>
          <p className="text-sm text-gray-500">Cancel anytime. No hidden charges. 100% secure.</p>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">What's included in the subscription?</h3>
              <p className="text-gray-600">
                You get unlimited access to browse all 70+ gym listings, compare prices, save your favorites, and directly contact gym owners.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Is it really just ₹10?</h3>
              <p className="text-gray-600">
                Yes! Just ₹10 one-time payment gives you lifetime access. No recurring charges, no subscriptions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Is the payment secure?</h3>
              <p className="text-gray-600">
                Absolutely! We use Razorpay, India's most trusted payment gateway. Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

