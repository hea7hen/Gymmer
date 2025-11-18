import GymCard from '../components/GymCard';
import { LoadingSkeleton } from '../components/Loading';
import { useGyms } from '../hooks/useGyms';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundCircles } from '../components/BackgroundCircles';

export default function Home() {
  const { data: gyms, isLoading } = useGyms({ sortBy: 'price-low' });
  const featuredGyms = gyms?.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Crushed Paper Background with Animated Circles */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden crushed-paper-bg">
        {/* Animated Background Circles */}
        <BackgroundCircles variant="tertiary" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="max-w-7xl mx-auto">
            {/* Headline and Subtitle Container - Side by Side Layout */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-10">
              {/* Left Side - Main Headline */}
              <div className="flex-1">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extra-bold text-gray-900 leading-tight animate-fade-in-up">
                  90+ Gyms.
                  <br />
                  <span className="text-gray-900">No Cult.fit.</span>
                  <br />
                  <span className="text-gray-900">Just real gyms.</span>
                </h1>
              </div>

              {/* Right Side - Hero Image */}
              <div className="lg:w-96 lg:pt-4 lg:px-4">
                <img
                  src="/hero-image.jpg"
                  alt="Fitness enthusiasts"
                  className="w-full h-auto rounded-lg shadow-lg animate-fade-in-up object-cover"
                  style={{ animationDelay: '0.2s' }}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons - Below the headline */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/pricing"
                className="group inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                Get started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gyms Section - Crushed Paper Background */}
      <section className="py-20 crushed-paper-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extra-bold text-gray-900 mb-4">
              A snapshot of all gyms in Bangalore.
            </h2>
            <p className="text-xl text-gray-600">Browse verified gym listings with accurate pricing and amenities</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : featuredGyms && featuredGyms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  to="/search"
                  className="inline-flex items-center text-gray-900 hover:text-primary font-semibold text-lg transition-colors"
                >
                  View all gyms
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-gray-600 mb-6 text-lg">Loading gym listings...</p>
              <Link
                to="/pricing"
                className="inline-block bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us - Clean White Cards */}
      <section className="py-20 crushed-paper-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extra-bold text-gray-900 mb-4">
              Why choose Gymmer?
            </h2>
            <p className="text-xl text-gray-600">Everything you need to find your perfect gym</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Data',
                description: 'Every gym listing is verified with accurate pricing, amenities, and contact information. No surprises, just facts.',
              },
              {
                title: 'Best Prices',
                description: 'Compare prices across 90+ gyms. Find the best value for your fitness budget without calling around.',
              },
              {
                title: 'Local Gyms',
                description: 'Discover amazing independent gyms in your neighborhood. Support local businesses and find hidden gems.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Minimal */}
      <section className="py-20 crushed-paper-bg relative border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1000+', label: 'Active Members' },
              { value: '90+', label: 'Gym Listings' },
              { value: '24', label: 'Neighborhoods' },
              { value: '4.8', label: 'Avg Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-extra-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Crushed Paper with Gradient Overlay */}
      <section className="py-20 relative overflow-hidden crushed-paper-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/40 via-orange-100/40 to-pink-100/40 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extra-bold text-gray-900 mb-6">
            Ready to find
            <br />
            your perfect gym?
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl">
            Join thousands of fitness enthusiasts. Get lifetime access to 90+ verified gyms for just ₹10.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/pricing"
              className="group inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Get started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center justify-center bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Browse gyms
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods - Clean Grid */}
      <section className="py-20 crushed-paper-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extra-bold text-gray-900 mb-4">
              Find gyms by area
            </h2>
            <p className="text-xl text-gray-600">Explore gyms in your neighborhood</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Marathahalli', 'Rajajinagar', 'Electronic City', 'Jayanagar', 'Hebbal', 'Banashankari'].map((area) => (
              <Link
                key={area}
                to={`/search?area=${encodeURIComponent(area)}`}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 text-gray-900 font-semibold py-4 px-6 rounded-lg text-center transition-all duration-300"
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
