import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { PageLoading } from './Loading';
import { Lock, CreditCard } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { hasAccess, isLoading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || subscriptionLoading) {
    return <PageLoading />;
  }

  if (!user) {
    return null;
  }

  // Check if user has access (either admin or active subscription)
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscription Required
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            To access our gym directory and compare prices, you need an active subscription.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-primary font-semibold mb-4">
              <CreditCard className="w-6 h-6" />
              <span className="text-2xl">Starting at ₹99/month</span>
            </div>
            <ul className="text-left space-y-2 text-gray-600 max-w-md mx-auto">
              <li className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                Access to 70+ verified gyms
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                Compare prices and amenities
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                Save your favorite gyms
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                Direct contact with gym owners
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/pricing')}
              className="btn-primary"
            >
              View Pricing Plans
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

