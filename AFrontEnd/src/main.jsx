import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import NonLive from './nonLive.jsx'
import Live from './Live.jsx'
import Home from './components/Home.jsx'
import Search from './components/Tabcompo/Search.jsx'
import Playlist from './components/Tabcompo/Playlist.jsx'
import LikedSongs from './components/Tabcompo/LikedSongs.jsx'
import LayoutTemp from './components/LayoutTemp.jsx'
import PLayerCard from './components/PLayerCard.jsx'




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
  <Route path='/' element={<LayoutTemp/>}>
        <Route path ='NonLive' element={<NonLive/>}/>
        <Route path='Live' element={< Live />} />
        <Route path='home' element={<Home/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='playlist' element={<Playlist/>}/>
        <Route path='likedsongs' element={<LikedSongs/>}/>
        <Route path='play/:id' element={<PLayerCard/>}/>



   </Route>



  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


















