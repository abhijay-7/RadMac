import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { PlayerContext } from "../Player/PlayerContext";
import { FaMusic, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import CreatePlaylistDialog from "../Playlistcompo/CreatePlaylistDialog";

const List = ({ item }) => {
  const navigate = useNavigate();
  const { playTrack } = useContext(PlayerContext);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const {playlists, getplaylist}= useContext(PlayerContext);

 
  const handlePlay = (id) => {
    playTrack(id);
  };

  const togglePlaylistPopup = (e) => {
    e.stopPropagation();
    setShowPlaylists(!showPlaylists);
  };

  const handleAddToPlaylist = async(e, playlistId) => {
    e.stopPropagation();
    console.log(`Adding ${item.id} to playlist ${playlistId}`);
    let res =  await axios.get(`/hi/rawSongMeta/${item.id}`)
    console.log(item)

    res = await axios.post(`/hi/playlist/addSong/${playlistId}`,res.data)
    console.log(res)

    // Here you would call your actual API/function to add to playlistst
    setShowPlaylists(false);
  };

  const createNewPlaylist = async(playlistData)=>{
    const res = await axios.post('/hi/playlist/create',playlistData)
    alert(res.status)
    console.log(res)

  }


  return (
    <div 
      onClick={() => handlePlay(item.id)}
      className="group hover:bg-gray-800 transition-colors rounded-lg relative"
    >
     <ul className="flex flex-col w-full">
  <li className="inline-flex items-center  gap-x-3 py-3 my-1  text-sm font-semibold text-white -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
    {/* Album cover */}
    <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-700">
      {item.coverUrl ? (
        <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <FaMusic size={14} />
        </div>
      )}
    </div>

    {/* Sliding text container */}
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="relative h-5 overflow-hidden group">
        <span 
          className={`absolute whitespace-nowrap ${
            item.title.length > 20 ?  
            'truncate':""
          } font-medium text-white group-hover:text-indigo-300 transition-colors`}
          
        >
          {item.title}
        </span>
      </div>
      
      {/* Artist name */}
      <div className="relative h-4 overflow-hidden group">
        <span 
          className={`absolute whitespace-nowrap text-xs ${
            (item.artist?.length || 0) > 25 ? 
            'group-hover:animate-marquee-slow' : 
            'truncate'
          } text-gray-400 group-hover:text-gray-300 transition-colors`}
          style={{
            animationDuration: `${Math.max(4, (item.artist?.length || 0) / 8)}s`,
            paddingLeft: (item.artist?.length || 0) > 25 ? '100%' : '0'
          }}
        >
          {item.artist || 'Unknown Artist'}
        </span>
      </div>
    </div>

    {/* Add to playlist button */}
    <div className="flex items-center gap-2 ml-2">
      <button 
        onClick={togglePlaylistPopup}
        className="opacity-70 hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50"
        aria-label="Add to playlist"
      >
        <FaPlus size={14} />
      </button>
    </div>
  </li>
</ul>

        {/* Playlist Selection Popup */}
        {showPlaylists && (
          <div 
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <h3 className="text-sm font-medium text-white">Add to playlist</h3>
                <button 
                  onClick={togglePlaylistPopup}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {playlists.map(playlist => (
                  <div
                    key={playlist.id}
                    onClick={(e) => handleAddToPlaylist(e, playlist._id)}
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                  >
                    {playlist.name}
                  </div>
                ))}
              </div>
              <div onClick ={()=>{setisDialogOpen(true)} } className="px-3 py-2 text-sm text-indigo-400 hover:bg-gray-700 rounded cursor-pointer border-t border-gray-700">
                + Create new playlist
                {isDialogOpen && <CreatePlaylistDialog onCreate={createNewPlaylist}  onClose={()=>setisDialogOpen(false) }></CreatePlaylistDialog>}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default List;