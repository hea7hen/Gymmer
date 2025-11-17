import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GymCard from '../components/GymCard';
import FilterChips from '../components/FilterChips';
import PriceRangeSlider from '../components/PriceRangeSlider';
import AmenityCheckboxes from '../components/AmenityCheckboxes';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import { LoadingSkeleton } from '../components/Loading';
import { useGyms, useNeighborhoodCounts } from '../hooks/useGyms';
import { GYM_TYPES } from '../types/gym';
import { Filter, X } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([350, 9000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedGymTypes, setSelectedGymTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize from URL params
  useEffect(() => {
    const area = searchParams.get('area');
    if (area) {
      setSelectedArea([area]);
    }
  }, [searchParams]);

  // Fetch data
  const { data: neighborhoods } = useNeighborhoodCounts();
  
  // Only apply filters if they're different from defaults
  const hasCustomPriceRange = priceRange[0] !== 350 || priceRange[1] !== 9000;
  
  const { data: allGyms, isLoading } = useGyms({
    area: selectedArea.length === 1 ? selectedArea[0] : undefined,
    minPrice: hasCustomPriceRange ? priceRange[0] : undefined,
    maxPrice: hasCustomPriceRange ? priceRange[1] : undefined,
    amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    gymTypes: selectedGymTypes.length > 0 ? selectedGymTypes : undefined,
    sortBy: sortBy as 'price-low' | 'price-high' | 'area',
  });

  // Pagination
  const totalPages = Math.ceil((allGyms?.length || 0) / itemsPerPage);
  const paginatedGyms = allGyms?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleAreaChange = (areas: string[]) => {
    setSelectedArea(areas);
    setPage(1);
    if (areas.length === 1) {
      setSearchParams({ area: areas[0] });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedArea([]);
    setPriceRange([350, 9000]);
    setSelectedAmenities([]);
    setSelectedGymTypes([]);
    setPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = selectedArea.length > 0 || 
    priceRange[0] !== 350 || 
    priceRange[1] !== 9000 || 
    selectedAmenities.length > 0 || 
    selectedGymTypes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Gym
          </h1>
          <p className="text-gray-600">
            {allGyms?.length || 0} gyms found
            {selectedArea.length > 0 && ` in ${selectedArea.join(', ')}`}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 btn-primary w-full justify-center"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Neighborhoods */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Neighborhood</h3>
                {neighborhoods && (
                  <FilterChips
                    chips={neighborhoods.map((n) => ({
                      id: n.area,
                      label: n.area,
                      count: n.count,
                    }))}
                    selectedIds={selectedArea}
                    onChange={handleAreaChange}
                    multiSelect={false}
                  />
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <PriceRangeSlider
                  min={350}
                  max={9000}
                  value={priceRange}
                  onChange={(value) => {
                    setPriceRange(value);
                    setPage(1);
                  }}
                />
              </div>

              {/* Gym Types */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Gym Type</h3>
                <FilterChips
                  chips={GYM_TYPES.map((t) => ({
                    id: t.id,
                    label: t.label,
                  }))}
                  selectedIds={selectedGymTypes}
                  onChange={(types) => {
                    setSelectedGymTypes(types);
                    setPage(1);
                  }}
                />
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <AmenityCheckboxes
                  selectedAmenities={selectedAmenities}
                  onChange={(amenities) => {
                    setSelectedAmenities(amenities);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Sort and View Options */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center justify-between">
              <span className="text-gray-600">
                Showing {((page - 1) * itemsPerPage) + 1}-{Math.min(page * itemsPerPage, allGyms?.length || 0)} of {allGyms?.length || 0}
              </span>
              <SortDropdown value={sortBy} onChange={(value) => {
                setSortBy(value);
                setPage(1);
              }} />
            </div>

            {/* Gym Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : paginatedGyms && paginatedGyms.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedGyms.map((gym) => (
                    <GymCard key={gym.id} gym={gym} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          page === i + 1
                            ? 'bg-primary text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">No gyms found matching your criteria</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

