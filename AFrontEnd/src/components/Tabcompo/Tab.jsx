import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Tabs = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center p-4 ">
      <div className="max-w-2xl w-full p-2 rounded-xl shadow-lg bg-gray-700">
        <ul className="flex justify-between space-x-2 ">
          <li className="flex-1 ">
           
            <Link
              to="/home"
              className={`w-full block text-center rounded-xl px-4 py-3 hover:text-white transition-all duration-200 ${
                location.pathname === '/home'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'rounded-xl '
              }`}
            >
            Home
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to="/search"
              className={`w-full block text-center px-4 py-3  hover:text-white  rounded-xl transition-all duration-200 ${
                location.pathname === '/search'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : ''
              }`}
            >
              Search
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to="/playlist"
              className={`w-full block text-center px-4 py-3  hover:text-white  rounded-xl transition-all duration-200 ${
                location.pathname === '/playlist'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : ''
              }`}
            >
              Favourite
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to="/likedsongs"
              className={`w-full block text-center px-4 py-3  hover:text-white  rounded-xl transition-all duration-200 ${
                location.pathname === '/likedsongs'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : ''
              }`}
            >
              Live...
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabs;