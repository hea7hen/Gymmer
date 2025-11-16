import SearchBar from '../components/SearchBar';
import GymCard from '../components/GymCard';
import { LoadingSkeleton } from '../components/Loading';
import { useFeaturedGyms } from '../hooks/useGyms';
import { Target, DollarSign, Heart, MapPin, Check, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data: featuredGyms, isLoading } = useFeaturedGyms();

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
            alt="Gym Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-primary/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block bg-primary px-6 py-2 rounded-full text-cream font-bold text-sm tracking-wide uppercase">
                Bangalore's #1 Gym Discovery Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extra-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-primary">Gym Today</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8">
              Discover 70+ verified independent gyms across Bangalore. Compare prices, amenities, and find the best fit for your fitness journey.
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="font-semibold">70+ Verified Gyms</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold">20+ Neighborhoods</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-semibold">Starting ₹350/month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 font-semibold mb-6">TRUSTED BY FITNESS ENTHUSIASTS ACROSS BANGALORE</p>
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-extra-bold text-primary mb-2">70+</div>
                <div className="text-gray-600">Active Gyms</div>
              </div>
              <div>
                <div className="text-4xl font-extra-bold text-primary mb-2">20+</div>
                <div className="text-gray-600">Neighborhoods</div>
              </div>
              <div>
                <div className="text-4xl font-extra-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Verified Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extra-bold text-gray-900 mb-4">
              Why Choose Gymmer?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding your perfect gym simple, transparent, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                100% Verified Data
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every gym listing is verified with accurate pricing, amenities, and contact information. No surprises, just facts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Compare & Save
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compare prices across gyms in your area. Find the best value for your budget without calling multiple places.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Support Local
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover amazing independent gyms in your neighborhood. Help local businesses thrive while you stay fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gyms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-extra-bold text-gray-900 mb-2">
                Featured Gyms
              </h2>
              <p className="text-lg text-gray-600">Handpicked premium fitness centers</p>
            </div>
            <Link to="/search" className="hidden md:block text-primary hover:text-primary-dark font-semibold text-lg">
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : featuredGyms && featuredGyms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/pricing" className="btn-primary inline-block">
                  Get Started Now
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">No featured gyms yet. Check out all our listings!</p>
              <Link to="/pricing" className="btn-primary inline-block">
                Get Started Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section with Image */}
      <section className="relative py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80"
            alt="Modern Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl sm:text-5xl font-extra-bold mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-cream mb-8">
              Join thousands of fitness enthusiasts finding their perfect gym match. Start exploring now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="bg-white text-primary hover:bg-cream font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block">
                View Pricing Plans
              </Link>
              <Link to="/signup" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extra-bold text-gray-900 mb-4">
              Explore Gyms by Neighborhood
            </h2>
            <p className="text-lg text-gray-600">Find the perfect gym in your area</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Marathahalli', 'Rajajinagar', 'Electronic City', 'Jayanagar', 'Hebbal', 'Banashankari'].map((area) => (
              <Link
                key={area}
                to={`/search?area=${encodeURIComponent(area)}`}
                className="bg-white hover:bg-primary hover:text-white text-gray-900 font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-sm hover:shadow-md"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

