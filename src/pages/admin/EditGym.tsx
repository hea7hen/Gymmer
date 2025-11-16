import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Gym } from '../../types/gym';
import { AMENITIES, GYM_TYPES } from '../../types/gym';
import { PageLoading, LoadingSpinner } from '../../components/Loading';
import { Upload, X } from 'lucide-react';

export default function EditGym() {
  const { gymId } = useParams<{ gymId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [gym, setGym] = useState<Gym | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchGym = async () => {
      if (!gymId) return;
      
      const gymDoc = await getDoc(doc(db, 'gyms', gymId));
      if (gymDoc.exists()) {
        setGym({ id: gymDoc.id, ...gymDoc.data() } as Gym);
      }
      setLoading(false);
    };

    fetchGym();
  }, [gymId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gym) return;

    setSaving(true);
    try {
      const gymRef = doc(db, 'gyms', gym.id);
      await updateDoc(gymRef, {
        ...gym,
        updatedAt: Timestamp.now(),
      });
      
      alert('Gym updated successfully!');
      navigate('/admin/gyms');
    } catch (error) {
      console.error('Error updating gym:', error);
      alert('Failed to update gym');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !gym) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i];
        const storageRef = ref(storage, `gyms/${gym.id}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }

      setGym({
        ...gym,
        images: [...gym.images, ...uploadedUrls].slice(0, 5),
        coverImage: gym.coverImage || uploadedUrls[0],
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (!gym) return;
    const newImages = gym.images.filter((_, i) => i !== index);
    setGym({
      ...gym,
      images: newImages,
      coverImage: newImages[0] || '',
    });
  };

  const toggleAmenity = (amenityId: string) => {
    if (!gym) return;
    
    const newAmenities = gym.amenities.includes(amenityId)
      ? gym.amenities.filter(a => a !== amenityId)
      : [...gym.amenities, amenityId];
    
    setGym({ ...gym, amenities: newAmenities });
  };

  const toggleGymType = (typeId: string) => {
    if (!gym) return;
    
    const newTypes = gym.gymTypes.includes(typeId)
      ? gym.gymTypes.filter(t => t !== typeId)
      : [...gym.gymTypes, typeId];
    
    setGym({ ...gym, gymTypes: newTypes });
  };

  if (authLoading || loading) return <PageLoading />;
  if (!user || !user.isAdmin || !gym) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Gym</h1>
          <p className="text-gray-600">Update gym information and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gym Name
                </label>
                <input
                  type="text"
                  value={gym.name}
                  onChange={(e) => setGym({ ...gym, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area/Neighborhood
                </label>
                <input
                  type="text"
                  value={gym.area}
                  onChange={(e) => setGym({ ...gym, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={gym.address}
                  onChange={(e) => setGym({ ...gym, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={gym.description}
                  onChange={(e) => setGym({ ...gym, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={gym.phone}
                  onChange={(e) => setGym({ ...gym, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={gym.whatsapp || ''}
                  onChange={(e) => setGym({ ...gym, whatsapp: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={gym.email || ''}
                  onChange={(e) => setGym({ ...gym, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={gym.instagram || ''}
                  onChange={(e) => setGym({ ...gym, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={gym.website || ''}
                  onChange={(e) => setGym({ ...gym, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly (₹)
                </label>
                <input
                  type="number"
                  value={gym.pricing.monthly || ''}
                  onChange={(e) => setGym({
                    ...gym,
                    pricing: { ...gym.pricing, monthly: parseInt(e.target.value) || null }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quarterly (₹)
                </label>
                <input
                  type="number"
                  value={gym.pricing.quarterly || ''}
                  onChange={(e) => setGym({
                    ...gym,
                    pricing: { ...gym.pricing, quarterly: parseInt(e.target.value) || null }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual (₹)
                </label>
                <input
                  type="number"
                  value={gym.pricing.annual || ''}
                  onChange={(e) => setGym({
                    ...gym,
                    pricing: { ...gym.pricing, annual: parseInt(e.target.value) || null }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Images</h2>
            
            <div className="mb-4">
              <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                {uploading ? 'Uploading...' : 'Upload Images'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading || gym.images.length >= 5}
                />
              </label>
              <p className="text-sm text-gray-600 mt-2">
                Max 5 images. Current: {gym.images.length}/5
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gym.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Gym ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES.map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gym.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>{amenity.icon} {amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gym Types */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gym Types</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GYM_TYPES.map((type) => (
                <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gym.gymTypes.includes(type.id)}
                    onChange={() => toggleGymType(type.id)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Status</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gym.isVerified}
                  onChange={(e) => setGym({ ...gym, isVerified: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
                <span className="font-medium">Verified Gym</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gym.isPremium}
                  onChange={(e) => setGym({ ...gym, isPremium: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
                <span className="font-medium">Premium/Featured Gym</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center justify-center"
            >
              {saving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/gyms')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

