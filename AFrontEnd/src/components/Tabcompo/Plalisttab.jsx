import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../Player/PlayerContext';
import axios from 'axios';
import PlaylistList from '../Playlistcompo/PlayList';

///  playlist/all

const Playlisttab = () => {
  // const [playlists , setPlaylists] = useState([]);
  const {playlists, getplaylist} = useContext(PlayerContext)
  useEffect(() => {
   getplaylist();
   console.log("plylist",playlists)
  }, []);

 

  return (
    <div className="  min-h-[830px] p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">My Playlist</h2>
     <div>
      
       {playlists.map((playlist, index) => (
        <PlaylistList playlist={playlist}>

        </PlaylistList>
       ))
      }

     </div>
    </div>
  );
};

export default Playlisttab