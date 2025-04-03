import React from 'react'
import Tab from './Tabcompo/Tab'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import MiniPlayer from '../components/Player/MiniPlayer'
import PLayerCard from './Player/PLayerCard'
import BottomTab from './BottomTab'

const LayoutTemp = () => {
  return (
    <>
    {/* <Header></Header> */}
    {/* <Tab></Tab> */}
    {/* <MiniPlayer></MiniPlayer>
    <PLayerCard></PLayerCard> */}
   
    <Outlet></Outlet>
    <BottomTab></BottomTab>

    </>
  )
}

export default LayoutTemp