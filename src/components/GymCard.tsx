import { Link } from 'react-router-dom';
import { MapPin, Heart, CheckCircle } from 'lucide-react';
import { Gym } from '../types/gym';
import { formatPrice, getAmenityIcon } from '../lib/utils';
import { useSavedGyms } from '../hooks/useSavedGyms';
import { useAuth } from '../hooks/useAuth';

interface GymCardProps {
  gym: Gym;
}

export default function GymCard({ gym }: GymCardProps) {
  const { user } = useAuth();
  const { isSaved, saveGym, unsaveGym } = useSavedGyms();
  const saved = isSaved(gym.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to save gyms');
      return;
    }
    
    if (saved) {
      unsaveGym(gym.id);
    } else {
      saveGym(gym.id);
    }
  };

  return (
    <Link to={`/gym/${gym.slug}`} className="card card-hover block group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={gym.coverImage}
          alt={gym.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {gym.isPremium && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              FEATURED
            </span>
          )}
          {gym.isVerified && (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {gym.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{gym.area}</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {gym.pricing.monthly ? (
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(gym.pricing.monthly)}
              </span>
              <span className="text-gray-600 text-sm">/month</span>
            </div>
          ) : (
            <span className="text-gray-600">Contact for pricing</span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex gap-2 flex-wrap">
          {gym.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="text-lg"
              title={amenity}
            >
              {getAmenityIcon(amenity)}
            </span>
          ))}
          {gym.amenities.length > 4 && (
            <span className="text-sm text-gray-600">+{gym.amenities.length - 4} more</span>
          )}
        </div>
      </div>
    </Link>
  );
}

