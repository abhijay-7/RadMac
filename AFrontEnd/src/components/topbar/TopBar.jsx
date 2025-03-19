import React from 'react'
import './TopBar.css'


const TopBar = ({FavButton ,CenterItem, SideItem, height }) => {
  const style = {
    '--minHeight': height
  }

  return (
    <div className='top-bar bg-white' style={style}>
       {FavButton}
       {CenterItem}
       {SideItem}
        TopBar
    </div>
  )
}

export default TopBar