import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Gym } from '../../types/gym';
import { PageLoading } from '../../components/Loading';
import { BarChart3, Eye, Phone, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const gymsSnapshot = await getDocs(collection(db, 'gyms'));
      const gyms = gymsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gym[];

      const totalGyms = gyms.length;
      const verifiedGyms = gyms.filter(g => g.isVerified).length;
      const premiumGyms = gyms.filter(g => g.isPremium).length;
      const totalViews = gyms.reduce((sum, g) => sum + (g.viewCount || 0), 0);
      const totalContacts = gyms.reduce((sum, g) => sum + (g.contactClickCount || 0), 0);

      return {
        totalGyms,
        verifiedGyms,
        premiumGyms,
        totalViews,
        totalContacts,
      };
    },
  });

  const { data: recentGyms } = useQuery({
    queryKey: ['recent-gyms'],
    queryFn: async () => {
      const q = query(
        collection(db, 'gyms'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gym[];
    },
  });

  if (loading || statsLoading) return <PageLoading />;
  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage gyms and view analytics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">Total Gyms</div>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalGyms || 0}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">Verified</div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.verifiedGyms || 0}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">Premium</div>
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.premiumGyms || 0}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">Total Views</div>
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalViews || 0}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">Contact Clicks</div>
              <Phone className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalContacts || 0}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/gyms" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Gyms</h3>
            <p className="text-gray-600">View, edit, and delete gym listings</p>
          </Link>

          <Link to="/admin/gyms/new" className="bg-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-white mb-2">Add New Gym</h3>
            <p className="text-cream">Create a new gym listing</p>
          </Link>

          <Link to="/admin/analytics" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Analytics</h3>
            <p className="text-gray-600">Detailed stats and reports</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Added Gyms</h2>
          {recentGyms && recentGyms.length > 0 ? (
            <div className="space-y-3">
              {recentGyms.map((gym) => (
                <Link
                  key={gym.id}
                  to={`/admin/gyms/${gym.id}/edit`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{gym.name}</div>
                    <div className="text-sm text-gray-600">{gym.area}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {gym.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {gym.isPremium && <Star className="w-4 h-4 text-primary" />}
                    <span className="text-sm text-gray-500">
                      {new Date(gym.createdAt.toDate()).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent gyms</p>
          )}
        </div>
      </div>
    </div>
  );
}

