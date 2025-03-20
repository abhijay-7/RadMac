import React from 'react'
import Tab from './Tabcompo/Tab'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const LayoutTemp = () => {
  return (
    <>
    {/* <Header></Header> */}
    <Tab></Tab>
    <Outlet></Outlet>

    </>
  )
}

export default LayoutTemp