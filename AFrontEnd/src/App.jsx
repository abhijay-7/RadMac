import React, { useContext } from 'react';
import { Button } from 'flowbite-react';
import Layout from './components/Layout';
import LayoutTemp from './components/LayoutTemp';
import { PlayerContext, PlayerProvider } from './components/Player/PlayerContext';
import FullPlayer from './components/Player/FullPlayer';
import MiniPlayer from './components/Player/MiniPlayer';
import { Route, Routes } from 'react-router';

function App() {

  return (
    <>
   <PlayerProvider>
      {/* Your main app content */}
      <LayoutTemp/>
      <div className="pb-24"> {/* Space for mini player */}
      </div>
     

      <MiniPlayer /> 
    </PlayerProvider>
    </>
    
  );
}

export default App;
