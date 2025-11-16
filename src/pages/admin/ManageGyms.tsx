import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Gym } from '../../types/gym';
import { PageLoading } from '../../components/Loading';
import { Search, Edit, Trash2, CheckCircle, Star, Download } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import Papa from 'papaparse';

export default function ManageGyms() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGyms, setSelectedGyms] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const { data: gyms, isLoading } = useQuery({
    queryKey: ['admin-gyms'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'gyms'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gym[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (gymId: string) => {
      await deleteDoc(doc(db, 'gyms', gymId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gyms'] });
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ gymIds, updates }: { gymIds: string[], updates: Partial<Gym> }) => {
      for (const gymId of gymIds) {
        await updateDoc(doc(db, 'gyms', gymId), updates);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gyms'] });
      setSelectedGyms([]);
    },
  });

  const filteredGyms = gyms?.filter(gym => 
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.area.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDelete = async (gymId: string) => {
    if (window.confirm('Are you sure you want to delete this gym?')) {
      deleteMutation.mutate(gymId);
    }
  };

  const handleBulkVerify = () => {
    if (selectedGyms.length === 0) return;
    bulkUpdateMutation.mutate({
      gymIds: selectedGyms,
      updates: { isVerified: true },
    });
  };

  const handleBulkPremium = () => {
    if (selectedGyms.length === 0) return;
    bulkUpdateMutation.mutate({
      gymIds: selectedGyms,
      updates: { isPremium: true },
    });
  };

  const handleBulkDelete = () => {
    if (selectedGyms.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedGyms.length} gyms?`)) {
      selectedGyms.forEach(gymId => deleteMutation.mutate(gymId));
      setSelectedGyms([]);
    }
  };

  const handleExportCSV = () => {
    if (!gyms) return;
    
    const csvData = gyms.map(gym => ({
      Name: gym.name,
      Area: gym.area,
      Address: gym.address,
      MonthlyPrice: gym.pricing.monthly || 'N/A',
      QuarterlyPrice: gym.pricing.quarterly || 'N/A',
      AnnualPrice: gym.pricing.annual || 'N/A',
      Phone: gym.phone || '',
      Email: gym.email || '',
      Website: gym.website || '',
      Verified: gym.isVerified ? 'Yes' : 'No',
      Premium: gym.isPremium ? 'Yes' : 'No',
      Views: gym.viewCount,
      ContactClicks: gym.contactClickCount,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gyms-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedGyms.length === filteredGyms.length) {
      setSelectedGyms([]);
    } else {
      setSelectedGyms(filteredGyms.map(g => g.id));
    }
  };

  const toggleSelect = (gymId: string) => {
    if (selectedGyms.includes(gymId)) {
      setSelectedGyms(selectedGyms.filter(id => id !== gymId));
    } else {
      setSelectedGyms([...selectedGyms, gymId]);
    }
  };

  if (loading || isLoading) return <PageLoading />;
  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Gyms</h1>
            <p className="text-gray-600">{filteredGyms.length} gyms total</p>
          </div>
          <Link to="/admin/gyms/new" className="btn-primary">
            Add New Gym
          </Link>
        </div>

        {/* Search and Bulk Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gyms by name or area..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button onClick={handleExportCSV} className="btn-secondary flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>

          {selectedGyms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 py-2">
                {selectedGyms.length} selected
              </span>
              <button
                onClick={handleBulkVerify}
                className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                Mark as Verified
              </button>
              <button
                onClick={handleBulkPremium}
                className="text-sm px-3 py-1 bg-primary-light text-primary-dark rounded-lg hover:bg-primary"
              >
                Mark as Premium
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Gyms Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedGyms.length === filteredGyms.length && filteredGyms.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-primary rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGyms.map((gym) => (
                  <tr key={gym.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedGyms.includes(gym.id)}
                        onChange={() => toggleSelect(gym.id)}
                        className="w-4 h-4 text-primary rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{gym.name}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{gym.area}</td>
                    <td className="px-4 py-3 text-gray-900 font-semibold">
                      {formatPrice(gym.pricing.monthly)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {gym.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {gym.isPremium && (
                          <Star className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{gym.viewCount || 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/gyms/${gym.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(gym.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGyms.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No gyms found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

