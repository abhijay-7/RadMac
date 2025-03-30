import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from 'react-router-dom'
import Home from './components/Home.jsx'
import Search from './components/Tabcompo/Search.jsx'
import Playlist from './components/Tabcompo/Playlist.jsx'
import LayoutTemp from './components/LayoutTemp.jsx'
import LiveSongs from './components/Tabcompo/LiveSongs.jsx'
import Favourite from './components/Tabcompo/Favourite.jsx'
import ComingSoon from './components/ComingSoon.jsx'
import MeetTheDeveloper from './components/Meetdev/MeetDev.jsx'
import Team from './components/Meetdev/Team.jsx'
import Uploader from './components/Uploader.jsx'
import PLayerCard from './components/Player/PLayerCard.jsx'
import MiniPlayer from './components/Player/MiniPlayer.jsx'
import { PlayerProvider } from './components/Player/PlayerContext.jsx'

import FullPlayer from './components/Player/FullPlayer.jsx'

// const router = createBrowserRouter([
//   {path:"/", element:<LayoutTemp/>},
//   {path: "/NonLive", element: <NonLive/>},
//   {path: "/Live", element: <Live/>},
//   {path: "/home" , element:<Home/>},
//   {path: "/search" , element:<Search/>},
//   {path: "/playlist" , element:<Playlist/>},
//   {path: "/likedsongs" , element:<LikedSongs/>},

// ]);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router}/>
//   </StrictMode>,
// )





const router = createBrowserRouter(
  createRoutesFromElements(
    <>
  <Route path='/' element={<App/>}>
         <Route path ='' element={<Home/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='favourites' element={<Favourite/>}/>
        <Route path='liveSongs' element={<LiveSongs/>}/>
        <Route path='play/:id' element={<PLayerCard/>}/>
        <Route path='playlist/:id' element={<Playlist/>}/>
        <Route path='/comingsoon' element={<ComingSoon/>}/>
        <Route path='play/:id' element={<FullPlayer fullMode={true} />}/>
   </Route>
        <Route path='/team' element={<Team/>}/>
        <Route path='/team/:id' element={<MeetTheDeveloper/>}/>

        <Route path='/admin' element={<Uploader/>}/>

   </>


  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


















