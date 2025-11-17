import GymCard from '../components/GymCard';
import { LoadingSkeleton } from '../components/Loading';
import { useGyms } from '../hooks/useGyms';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data: gyms, isLoading } = useGyms({ sortBy: 'price-low' });
  const featuredGyms = gyms?.slice(0, 6);

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FF8C42 10px, #FF8C42 20px)'
        }}></div>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle, #FF8C42 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extra-bold text-gray-900 leading-tight mb-6">
                Fitness studio:
                <br />
                fueling the fire within for{' '}
                <span className="text-primary">a better you</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
                Discover 70+ verified independent gyms across Bangalore. Compare prices, amenities, and find the perfect fit for your fitness journey.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-6 mb-8 text-gray-500">
                <span className="text-sm font-medium">Follow us:</span>
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 hover:shadow-xl group"
                >
                  Get Started - Just ₹10
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-gray-900 hover:text-white transition-all"
                >
                  Browse Gyms
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                  alt="Fitness Training"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-extra-bold text-primary mb-2">70+</div>
              <div className="text-gray-600 font-medium">Verified Gyms</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extra-bold text-primary mb-2">24</div>
              <div className="text-gray-600 font-medium">Neighborhoods</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extra-bold text-primary mb-2">₹10</div>
              <div className="text-gray-600 font-medium">One-time Fee</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extra-bold text-primary mb-2">100%</div>
              <div className="text-gray-600 font-medium">Verified Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extra-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary">Gymmer</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find your perfect gym, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Verified Data</h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  Every gym listing verified with accurate pricing and amenities. No surprises, just facts.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Best Prices</h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  Compare prices across gyms in your area. Find the best value for your budget.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Support Local</h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  Discover amazing independent gyms in your neighborhood. Help local businesses thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Gyms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extra-bold text-gray-900 mb-3">
                Latest <span className="text-primary">Gyms</span>
              </h2>
              <p className="text-lg text-gray-600">Recently added fitness centers</p>
            </div>
            <Link 
              to="/search" 
              className="hidden md:flex items-center text-gray-900 hover:text-primary font-bold text-lg group"
            >
              View All
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
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
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 hover:shadow-xl group"
                >
                  Get Started - Just ₹10
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-gray-600 mb-6 text-lg">Loading gym listings...</p>
              <Link to="/pricing" className="btn-primary inline-block">
                Get Started Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extra-bold text-white mb-6">
            Start Your Fitness Journey
            <span className="block text-primary">Today</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Just ₹10 for lifetime access to 70+ verified gyms. No subscriptions, no hidden fees. Your fitness transformation starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/pricing" 
              className="inline-flex items-center justify-center bg-primary text-white font-bold py-5 px-10 rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 hover:shadow-2xl text-lg group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/signup" 
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-5 px-10 rounded-lg hover:bg-white hover:text-gray-900 transition-all text-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extra-bold text-gray-900 mb-4">
              Browse by <span className="text-primary">Neighborhood</span>
            </h2>
            <p className="text-lg text-gray-600">Find the perfect gym in your area</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Marathahalli', 'Rajajinagar', 'Electronic City', 'Jayanagar', 'Hebbal', 'Banashankari'].map((area) => (
              <Link
                key={area}
                to={`/search?area=${encodeURIComponent(area)}`}
                className="group bg-gray-50 hover:bg-primary text-gray-900 hover:text-white font-bold py-4 px-6 rounded-xl text-center transition-all border-2 border-transparent hover:border-primary hover:shadow-lg transform hover:-translate-y-1"
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
