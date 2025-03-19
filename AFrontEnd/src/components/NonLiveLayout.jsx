import React from 'react'
import Sidebar from './Sidebar'
import MainTheme from '../components/Maintheme/MainTheme'
import Player from './Player'
import Viz from './Viz'
import SongBox from './songBox'
import LiveScreen from './LiveScreen'
import TopBar from './topbar/TopBar'
import FavButton from './topbar/FavButton'
import './Layout.css'
import { useNavigate } from 'react-router-dom';
import NonLiveScreen from './NonLiveScreen'


const NonLiveLayout = () => {
    const navigate = useNavigate();
  const bgColor = 'bg-pink-100';
  const bgColorHex = '#000000'

  const hostIp = import.meta.env.VITE_HOST_IP;
  const playerPort = import.meta.env.VITE_PLAYER_PORT
  const topbarHeight = '60px';
  const style ={
    '--ptop': topbarHeight
  };
  const handleFavButtonClick = () => {
    navigate('/Live')
};

  const apiUrl = '/player/LiveSongMeta/';
  return (
    <>
    <TopBar FavButton={<FavButton  favbgColor={'bg-cyan-50'} favOnClick={handleFavButtonClick} />}  height={topbarHeight}/>
    <div className='layout-body' style={style}>
    <NonLiveScreen  bgColor={bgColor} bgColorHex={bgColorHex}  />
    </div>
    </>
  )
}

export default NonLiveLayout;