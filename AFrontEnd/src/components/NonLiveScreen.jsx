import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MainTheme from '../components/Maintheme/MainTheme'
import Player from './Player'
import Viz from './Viz'
import SongBox from './songBox'
import NonLiveSidebar from './nonLiveSideBar'
import NonLiveSongBox from './nonLiveSongBox'
import NonLivePlayer from './nonLivePlayer'

const NonLiveScreen = ({bgColor, bgColorHex}) => {
 
 

  const hostIp = import.meta.env.VITE_HOST_IP;
  const playerPort = import.meta.env.VITE_PLAYER_PORT
  const [song, setSong] = useState("0");

  const handleSongClick=(id)=>{
   
    setSong( String(id))
    console.log(id,"nlscreen")
    console.log(apiUrl)
  }

  const apiUrl = `/SongMeta/${song}`;
  return (
    <div className={`${bgColor}`}>

      <NonLiveSidebar onSongClick={handleSongClick}> </NonLiveSidebar>

      <div className="p-4 sm:ml-80 ">

        <NonLiveSongBox height={"50%"} width={"100%"} apiUrl={apiUrl} bgColor={bgColor} />
        <MainTheme bgColorHex={bgColorHex} ></MainTheme>

        <div className="p-4  m-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <NonLivePlayer Url={`/hi/get-song/${song}`}> </NonLivePlayer>
        </div>
      </div>
      <MainTheme></MainTheme>
    </div>
  )
}

export default NonLiveScreen;