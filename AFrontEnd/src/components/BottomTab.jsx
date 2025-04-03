import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomTab = () => {
  const location = useLocation();

  // Helper function to determine active tab
  const isActive = (path) => location.pathname === path;

  return (
    <div className="z-50 fixed bottom-0 left-0 right-0 bg-black flex justify-around py-3 border-t border-gray-800">
      <Link 
        to="/home" 
        className={`flex flex-col items-center ${isActive('/home') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link 
        to="/search" 
        className={`flex flex-col items-center ${isActive('/search') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-xs mt-1">Search</span>
      </Link>

      <Link 
        to="/favourites" 
        className={`flex flex-col items-center ${isActive('/favourites') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-xs mt-1">Favorites</span>
      </Link>

      <Link 
        to="/liveSongs" 
        className={`flex flex-col items-center ${isActive('/liveSongs') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="text-xs mt-1">Live</span>
      </Link>
    </div>
  );
};

export default BottomTab;