import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { PRICING_PLANS, PricingPlan } from '../types/subscription';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (hasActiveSubscription && plan.duration !== 'lifetime') {
      alert('You already have an active subscription!');
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setLoading(plan.id);

    try {
      // Determine the price based on plan
      let amount = plan.price;
      if (plan.duration === 'yearly' && plan.yearlyPrice) {
        amount = plan.yearlyPrice;
      }

      // Create subscription record in Firestore
      const subscriptionData: any = {
        userId: user.id,
        planType: plan.duration,
        amount: amount,
        status: 'created' as const,
        purchaseDate: Timestamp.now(),
        createdAt: Timestamp.now(),
      };

      // Add expiry date for monthly and yearly plans
      if (plan.duration === 'monthly') {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        subscriptionData.expiresAt = Timestamp.fromDate(expiresAt);
      } else if (plan.duration === 'yearly') {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        subscriptionData.expiresAt = Timestamp.fromDate(expiresAt);
      }

      const subscriptionRef = await addDoc(collection(db, 'subscriptions'), subscriptionData);

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Gymmer',
        description: `${plan.name} - ${plan.period}`,
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
            Plan: <span className="font-semibold">
              {subscription.planType === 'lifetime' ? 'Lifetime Access' : 
               subscription.planType === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'}
            </span>
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
    <div className="min-h-screen bg-black py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include access to our platform, gym listings, and dedicated support.
          </p>
        </div>

        

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            const displayPrice = plan.yearlyPrice && plan.duration === 'yearly'
              ? plan.yearlyPrice
              : plan.price;

            return (
              <motion.div
                key={plan.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{
                  y: plan.isPopular ? -20 : 0,
                  opacity: 1,
                  scale: plan.isPopular ? 1.05 : 1.0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1,
                }}
                className={cn(
                  "rounded-2xl border p-6 bg-gray-900 text-center relative flex flex-col",
                  plan.isPopular ? "border-primary border-2 shadow-xl" : "border-gray-700 shadow-lg",
                  !plan.isPopular && "mt-5"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                    <Star className="text-white h-4 w-4 fill-current" />
                    <span className="text-white ml-1 font-semibold text-sm">
                      Popular
                    </span>
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <p className="text-base font-semibold text-gray-300 mb-2">
                    {plan.name}
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      ₹{displayPrice}
                    </span>
                    {plan.period !== 'lifetime' && (
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-400">
                        / {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.duration === 'yearly' && (
                    <p className="text-xs leading-5 text-gray-400 mt-1">
                      billed annually
                    </p>
                  )}

                  {plan.duration === 'monthly' && (
                    <p className="text-xs leading-5 text-gray-400 mt-1">
                      billed monthly
                    </p>
                  )}

                  {plan.duration === 'lifetime' && (
                    <p className="text-xs leading-5 text-gray-400 mt-1">
                      one-time payment
                    </p>
                  )}

                  <ul className="mt-6 gap-3 flex flex-col text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="w-full my-6 border-gray-700" />

                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={loading === plan.id || !razorpayLoaded}
                    className={cn(
                      "w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300",
                      "transform hover:scale-105 hover:shadow-lg",
                      plan.isPopular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    )}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : !razorpayLoaded ? (
                      'Loading...'
                    ) : (
                      plan.buttonText
                    )}
                  </button>

                  <p className="mt-4 text-xs leading-5 text-gray-400">
                    {plan.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-4">🔒 Secure payment powered by Razorpay</p>
          <p className="text-sm text-gray-400">Cancel anytime. No hidden charges. 100% secure.</p>
        </div>
      </div>
    </div>
  );
}
