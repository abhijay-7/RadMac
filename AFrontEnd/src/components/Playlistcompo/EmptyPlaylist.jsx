import React from 'react';
import { FaMusic, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyPlaylist = ({ playlistName = "this playlist" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center p-6">
      {/* Animated music icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
        <div className="relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 shadow-lg">
          <FaMusic className="text-5xl text-indigo-400" />
        </div>
      </div>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
        {playlistName} is empty
      </h2>
      <p className="text-gray-400 max-w-md mb-8 text-sm md:text-base">
        There are no songs in this playlist yet. Add some tracks to start listening.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Link
          to="/search"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all transform hover:scale-105"
        >
          <FaSearch />
          Find Songs
        </Link>
        
      </div>

      {/* Help text */}
      <p className="mt-8 text-xs text-gray-500">
        Pro tip: You can also drag and drop songs here
      </p>
    </div>
  );
};

export default EmptyPlaylist;