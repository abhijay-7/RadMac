import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NonLive from './nonLive.jsx'
import Live from './Live.jsx'

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path: "/NonLive", element: <NonLive/>},
  {path: "/Live", element: <Live/>}
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
