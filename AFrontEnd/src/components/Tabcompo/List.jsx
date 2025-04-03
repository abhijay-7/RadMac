import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { PlayerContext } from "../Player/PlayerContext";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import CreatePlaylistDialog from "../Playlistcompo/CreatePlaylistDialog";

const List = ({ item }) => {
  const navigate = useNavigate();
  const { playTrack } = useContext(PlayerContext);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);

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
        <li className="inline-flex items-center m-3 gap-x-2 py-3 px-4 text-sm font-semibold text-white -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer">
          <div className="flex justify-between items-center w-full">
            <span className="group-hover:text-indigo-400 transition-colors truncate">
              {item.title}
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePlaylistPopup}
                className="opacity-0.5 mx-2 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                aria-label="Add to playlist"
              >
                <FaPlus size={14} />
              </button>
            </div>
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