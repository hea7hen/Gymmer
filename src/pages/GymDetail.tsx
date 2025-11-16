import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useGym } from '../hooks/useGyms';
import { useSavedGyms } from '../hooks/useSavedGyms';
import { useAuth } from '../hooks/useAuth';
import { PageLoading } from '../components/Loading';
import { 
  MapPin, Phone, Mail, Instagram, Globe, 
  Heart, Share2, CheckCircle, AlertTriangle 
} from 'lucide-react';
import { formatPrice, calculateSavings, getAmenityIcon, getAmenityLabel } from '../lib/utils';

export default function GymDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: gym, isLoading, error } = useGym(slug!);
  const { isSaved, saveGym, unsaveGym } = useSavedGyms();

  // Track view count
  useEffect(() => {
    if (gym) {
      const incrementViewCount = async () => {
        const gymRef = doc(db, 'gyms', gym.id);
        await updateDoc(gymRef, {
          viewCount: increment(1),
        });
      };
      incrementViewCount();
    }
  }, [gym]);

  const handleContactClick = async () => {
    if (gym) {
      const gymRef = doc(db, 'gyms', gym.id);
      await updateDoc(gymRef, {
        contactClickCount: increment(1),
      });
    }
  };

  const handleSaveClick = () => {
    if (!user) {
      alert('Please login to save gyms');
      navigate('/login');
      return;
    }
    
    if (isSaved(gym!.id)) {
      unsaveGym(gym!.id);
    } else {
      saveGym(gym!.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gym?.name,
        text: `Check out ${gym?.name} on Gymmer`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) return <PageLoading />;
  
  if (error || !gym) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gym Not Found</h1>
          <p className="text-gray-600 mb-6">
            The gym you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate('/search')} className="btn-primary">
            Browse All Gyms
          </button>
        </div>
      </div>
    );
  }

  const saved = isSaved(gym.id);
  const monthlySavings = calculateSavings(gym.pricing.monthly, gym.pricing.quarterly, 3);
  const annualSavings = calculateSavings(gym.pricing.monthly, gym.pricing.annual, 12);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96">
        <img
          src={gym.coverImage}
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          {gym.isPremium && (
            <span className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">
              FEATURED
            </span>
          )}
          {gym.isVerified && (
            <span className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verified
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={handleSaveClick}
            className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-6 h-6 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            onClick={handleShare}
            className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Share2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{gym.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{gym.address}, {gym.area}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{gym.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gym.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <span className="text-2xl">{getAmenityIcon(amenity)}</span>
                    <span className="text-gray-700">{getAmenityLabel(amenity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h2>
              <div className="space-y-2">
                {Object.entries(gym.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 capitalize font-medium">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${gym.coordinates.lat},${gym.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Source Attribution */}
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600">
              <p>
                Pricing sourced from {gym.source} • Last updated {new Date(gym.updatedAt.toDate()).toLocaleDateString()}
              </p>
              <button className="text-primary hover:text-primary-dark mt-2">
                Report incorrect info →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-primary">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
                
                {gym.pricing.monthly ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-extra-bold text-primary">
                        {formatPrice(gym.pricing.monthly)}
                      </div>
                      <div className="text-gray-600">per month</div>
                    </div>

                    {gym.pricing.quarterly && (
                      <div className="border-t pt-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(gym.pricing.quarterly)}
                        </div>
                        <div className="text-gray-600">for 3 months</div>
                        {monthlySavings && monthlySavings > 0 && (
                          <div className="text-sm text-green-600 mt-1">
                            Save {formatPrice(monthlySavings)}
                          </div>
                        )}
                      </div>
                    )}

                    {gym.pricing.annual && (
                      <div className="border-t pt-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(gym.pricing.annual)}
                        </div>
                        <div className="text-gray-600">per year</div>
                        {annualSavings && annualSavings > 0 && (
                          <div className="text-sm text-green-600 mt-1">
                            Save {formatPrice(annualSavings)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">Contact gym for pricing</p>
                )}
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-3">
                  {gym.phone ? (
                    <a
                      href={`tel:${gym.phone}`}
                      onClick={handleContactClick}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{gym.phone}</span>
                    </a>
                  ) : (
                    <div className="text-gray-400 text-sm">Phone: Not available</div>
                  )}

                  {gym.email && (
                    <a
                      href={`mailto:${gym.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{gym.email}</span>
                    </a>
                  )}

                  {gym.instagram && (
                    <a
                      href={gym.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {gym.website && (
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  )}

                  {!gym.phone && !gym.email && !gym.instagram && !gym.website && (
                    <p className="text-gray-500 text-sm">
                      Contact information will be added soon
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

