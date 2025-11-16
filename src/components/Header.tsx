import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Heart, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extra-bold text-cream">GYMMER</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-cream hover:text-white transition-colors font-semibold">
              Home
            </Link>
            <Link to="/pricing" className="text-cream hover:text-white transition-colors font-semibold">
              Pricing
            </Link>
            <Link to="/search" className="text-cream hover:text-white transition-colors font-semibold">
              Find Gyms
            </Link>
            {user && (
              <Link to="/saved" className="text-cream hover:text-white transition-colors font-semibold">
                Saved
              </Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="text-cream hover:text-white transition-colors font-semibold">
                Admin
              </Link>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-cream hover:text-white transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border-2 border-cream" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <Link
                      to="/saved"
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Saved Gyms
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-cream hover:text-white transition-colors font-semibold">
                  Login
                </Link>
                <Link to="/signup" className="bg-cream text-primary hover:bg-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-dark">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-cream hover:text-white transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/pricing"
                className="text-cream hover:text-white transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/search"
                className="text-cream hover:text-white transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Gyms
              </Link>
              {user && (
                <>
                  <Link
                    to="/saved"
                    className="text-cream hover:text-white transition-colors font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Saved
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="text-cream hover:text-white transition-colors font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-cream hover:text-white transition-colors font-semibold"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="text-cream hover:text-white transition-colors font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-cream text-primary hover:bg-white font-semibold py-2 px-6 rounded-lg text-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

