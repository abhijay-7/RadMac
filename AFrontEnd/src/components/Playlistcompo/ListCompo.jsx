import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Listcompo = () => {

    const [playlists, setPlaylists]  = useState([]);

    async function fetchPlaylists(){
        try{
            const res  = await axios.get('/hi/playlist/all')
            console.log(res.data);
            setPlaylists(res.data);
        }
        catch(e){

        }
    }
    useEffect(()=>{
        fetchPlaylists()

    },[])

    const handleSelectPlaylist =  ()=>{

    }

  return (
<div className="space-y-1">
      {playlists.map((playlist) => (
        <Link to = {`/playlist/${playlist._id}`}>
        <div
          key={playlist._id}
        
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors 
          `}
        >
          <img
            src={playlist.coverArt}
            alt={`${playlist.name} cover`}
            className="w-12 h-12 rounded-md object-cover"
          />


          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {playlist.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {playlist.userName}
            </p>
          </div>

          
        </div>
        </Link>
        
      ))}
    </div>

  );
};

export default Listcompo;