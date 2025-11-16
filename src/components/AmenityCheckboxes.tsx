import { AMENITIES } from '../types/gym';

interface AmenityCheckboxesProps {
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
}

export default function AmenityCheckboxes({ selectedAmenities, onChange }: AmenityCheckboxesProps) {
  const handleToggle = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      onChange(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      onChange([...selectedAmenities, amenityId]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {AMENITIES.map((amenity) => (
        <label
          key={amenity.id}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selectedAmenities.includes(amenity.id)}
            onChange={() => handleToggle(amenity.id)}
            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer"
          />
          <span className="flex items-center gap-2 text-gray-700 group-hover:text-primary transition-colors">
            <span>{amenity.icon}</span>
            <span>{amenity.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

