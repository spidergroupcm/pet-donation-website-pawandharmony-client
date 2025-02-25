import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import logo from '../assets/logo/logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-purple-600 to-yellow-400 shadow sticky top-0 z-50">
      <div className="container mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-auto h-10" />
          <span className="font-bold text-2xl text-white">Paw & Harmony</span>
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:gap-8 absolute md:static top-16 left-0 w-full bg-blue-800 md:bg-transparent md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row gap-6 text-white text-lg items-center py-4 md:py-0">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pet-listing" className="hover:underline">
                Pets
              </Link>
            </li>
            <li>
              <Link to="/donation-campaigns" className="hover:underline">
                Donation
              </Link>
            </li>
          </ul>
          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div
                  title={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                >
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                  />
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-white text-blue-800 px-4 py-2 rounded font-medium hover:bg-gray-200">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-blue-800 px-4 py-2 rounded font-medium hover:bg-gray-200">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

