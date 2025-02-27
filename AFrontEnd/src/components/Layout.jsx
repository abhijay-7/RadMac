import React from 'react'
import Sidebar from './Sidebar'
import MainTheme from '../components/Maintheme/MainTheme'
import Player from './Player'

const Layout = () => {
  return (
    <>

    <Sidebar></Sidebar>

{/* 
////////////////////// */}
     <div className="p-4 sm:ml-80 ">
        <div className="p-4 border-2 bg-black border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
        <MainTheme></MainTheme>
        </div>
{/* ///////////////////// */}
<div className="p-4  m-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
        <Player></Player>
        </div>

      </div>
    </>
  )
}

export default Layout