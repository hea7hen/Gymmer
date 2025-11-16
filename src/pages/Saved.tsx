import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSavedGyms } from '../hooks/useSavedGyms';
import GymCard from '../components/GymCard';
import { LoadingSkeleton, PageLoading } from '../components/Loading';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';

export default function Saved() {
  const { user, loading: authLoading } = useAuth();
  const { savedGyms, isLoading } = useSavedGyms();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) return <PageLoading />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            Saved Gyms
          </h1>
          <p className="text-gray-600">
            {savedGyms.length} {savedGyms.length === 1 ? 'gym' : 'gyms'} saved
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : savedGyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No saved gyms yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite gyms for quick access
            </p>
            <button
              onClick={() => navigate('/search')}
              className="btn-primary"
            >
              Browse Gyms
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

