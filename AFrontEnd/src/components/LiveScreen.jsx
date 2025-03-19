import React from 'react'
import Sidebar from './Sidebar'
import MainTheme from '../components/Maintheme/MainTheme'
import Player from './Player'
import Viz from './Viz'
import SongBox from './songBox'

const LiveScreen = ({bgColor, bgColorHex}) => {
 
 

  const hostIp = import.meta.env.VITE_HOST_IP;
  const playerPort = import.meta.env.VITE_PLAYER_PORT

  const apiUrl = '/player/LiveSongMeta/';
  return (
    <div className={`${bgColor}`}>

      <Sidebar></Sidebar>

      <div className="p-4 sm:ml-80 ">

        <SongBox height={"50%"} width={"100%"} apiUrl={apiUrl} bgColor={bgColor} />
        <MainTheme bgColorHex={bgColorHex} ></MainTheme>

        <div className="p-4  m-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <Player></Player>
        </div>
      </div>
      <MainTheme></MainTheme>
    </div>
  )
}

export default LiveScreen;