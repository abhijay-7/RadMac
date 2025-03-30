import React from 'react'
import Tab from './Tabcompo/Tab'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import MiniPlayer from '../components/Player/MiniPlayer'
import PLayerCard from './Player/PLayerCard'

const LayoutTemp = () => {
  return (
    <>
    {/* <Header></Header> */}
    <Tab></Tab>
    {/* <MiniPlayer></MiniPlayer>
    <PLayerCard></PLayerCard> */}
   
    <Outlet></Outlet>

    </>
  )
}

export default LayoutTemp