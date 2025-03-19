import React from 'react'

const FavButton = ({favbgColor, favOnClick}) => {
  return (
    <div className={`mr-2 pr-1 pl-1 ${favbgColor} select-none `} onClick ={favOnClick}>
        FavButton
    </div>
  )
}

export default FavButton