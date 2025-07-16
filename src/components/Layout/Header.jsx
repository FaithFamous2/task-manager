import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">TaskFlow</Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`hover:text-indigo-200 transition ${location.pathname === '/dashboard' ? 'font-semibold underline' : ''}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/insights"
                  className={`hover:text-indigo-200 transition ${location.pathname === '/insights' ? 'font-semibold underline' : ''}`}
                >
                  Insights
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline">Hi, {user.email}</span>
                <button
                  onClick={signOut}
                  className="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-800 text-white px-4 py-1 rounded-md hover:bg-indigo-900 transition border border-indigo-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu (dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`py-2 px-4 rounded hover:bg-indigo-700 ${location.pathname === '/dashboard' ? 'bg-indigo-700 font-semibold' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/insights"
                    className={`py-2 px-4 rounded hover:bg-indigo-700 ${location.pathname === '/insights' ? 'bg-indigo-700 font-semibold' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Insights
                  </Link>
                </>
              )}

              <div className="border-t border-indigo-500 pt-3 mt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-indigo-200">
                      Hi, {user.email}
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-4 rounded hover:bg-indigo-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="py-2 px-4 rounded hover:bg-indigo-700 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-900 transition text-center border border-indigo-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
