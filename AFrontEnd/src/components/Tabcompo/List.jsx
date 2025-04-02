import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { PlayerContext } from "../Player/PlayerContext";
import { FaPlus, FaTimes } from "react-icons/fa";

const List = ({ item }) => {
  const navigate = useNavigate();
  const { playTrack } = useContext(PlayerContext);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "Favorites" },
    { id: 2, name: "Workout Mix" },
    { id: 3, name: "Chill Vibes" },
    { id: 4, name: "Road Trip" }
  ]);

  const handlePlay = (id) => {
    playTrack(id);
  };

  const togglePlaylistPopup = (e) => {
    e.stopPropagation();
    setShowPlaylists(!showPlaylists);
  };

  const handleAddToPlaylist = (e, playlistId) => {
    e.stopPropagation();
    console.log(`Adding ${item.title} to playlist ${playlistId}`);
    // Here you would call your actual API/function to add to playlistst
    setShowPlaylists(false);
  };

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
                  onClick={(e) => handleAddToPlaylist(e, playlist.id)}
                  className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                >
                  {playlist.name}
                </div>
              ))}
            </div>
            <div className="px-3 py-2 text-sm text-indigo-400 hover:bg-gray-700 rounded cursor-pointer border-t border-gray-700">
              + Create new playlist
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;