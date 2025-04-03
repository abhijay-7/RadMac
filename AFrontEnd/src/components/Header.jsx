import React from 'react'
import { FaHeadphones } from 'react-icons/fa';

const Header = () => {
  return (
    <>
    <header class='flex ite  py-3 px-4 sm:px-10  min-h-[65px] tracking-wide relative z-50'>
      <div class='flex flex-wrap items-center gap max-w-screen-xl mx-auto w-full'>
      {/* <FaHeadphones className="text-white text-xl mx-2" /> */}

      <h1 className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-gray-200 tracking-wider">
            RADMAC
            <span className="text-sm ml-1 font-light bg-white/10 px-2 py-0.5 rounded-full">BETA</span>
          </h1>
      </div>
    </header>
    </>
  )
}

export default Header