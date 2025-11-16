import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ defaultValue = '', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?area=${encodeURIComponent(query)}`);
    }
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In a real app, you'd convert coordinates to neighborhood
          alert('Location feature coming soon!');
        },
        () => {
          alert('Unable to get your location. Please search manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area (Koramangala, Indiranagar...)"
            className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
        >
          Search Gyms
        </button>
        
        <button
          type="button"
          onClick={handleUseLocation}
          className="btn-secondary whitespace-nowrap flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Use My Location
        </button>
      </div>
    </form>
  );
}

