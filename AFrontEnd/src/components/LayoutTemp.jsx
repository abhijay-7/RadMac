import React from 'react'
import Tab from './Tabcompo/Tab'
import { Outlet } from 'react-router-dom'

const LayoutTemp = () => {
  return (
    <>
    <Tab></Tab>
    <Outlet></Outlet>

    </>
  )
}

export default LayoutTemp