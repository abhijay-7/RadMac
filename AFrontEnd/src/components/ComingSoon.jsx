import React from 'react'
import { Link } from 'react-router'

const ComingSoon = () => {
  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl p-12 mx-4 hover:shadow-3xl transition-all duration-500">
        {/* Image */}
        <img
          src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
          alt="Developers Working"
          className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
        />

        {/* Heading */}
        <h1 className="text-6xl font-bold mb-4 mt-6 animate-pulse">Coming Soon</h1>

        {/* Description */}
        {/* <p className="text-xl mb-8">We're working hard to bring you something amazing. Stay tuned!</p> */}

        {/* Loader */}
        {/* <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div> */}

        {/* Developer Text */}
        <p className="mt-8 text-sm text-gray-300">We are working on it...</p>
        <Link 
      to="/team" 
      className="  mt-8   bg-gray-900 w-full h-full rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110"
      aria-label="Meet the developers"
    >
      <span className="text-2xl m-3">Meet the developers👨‍💻</span>
    </Link>
      </div>
    </div>
    </>
  )
}

export default ComingSoon