import React, { useEffect, useState } from 'react';

import axios from 'axios';
import PlaylistList from '../Playlistcompo/PlayList';

///  playlist/all

const Playlisttab = () => {
  const [playlists , setPlaylists] = useState([]);
  useEffect(() => {
    axios
      .get(`/hi/playlist/all`)
      .then((response) => {
        console.log(response.data);
        setPlaylists(response.data)
        
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
 

  return (
    <div className="p-4 max-w-md mx-auto">
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