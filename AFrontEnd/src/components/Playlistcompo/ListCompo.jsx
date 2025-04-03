import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { PlayerContext } from "../Player/PlayerContext";
import { FaPlay, FaMusic } from "react-icons/fa";

const   ListCompo = ({ item, index }) => {
  const navigate = useNavigate();
  const { playTrack } = useContext(PlayerContext);

  const handlePlay = (e) => {
    e.stopPropagation();
    playTrack(item._id);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      onClick={handlePlay}
      className="group flex items-center  py-3 hover:bg-gray-800/50 transition-colors rounded-lg cursor-pointer border-b border-gray-800 last:border-0"
    >
      
      {/* Track info */}
      <div className="flex-1 min-w-0 flex items-center">
        <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
          {item.metadata.coverArt ? (
            <img 
              src="" 
              alt={item.metadata.title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <FaMusic className="text-gray-500" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-white font-medium truncate group-hover:text-indigo-400 transition-colors">
            {item.metadata.title}
          </h3>
          <p className="text-xs text-gray-400 truncate">
            {item.metadata.artist || 'Unknown Artist'}
          </p>
        </div>
      </div>

      {/* Duration and play button */}
      <div className="flex items-center ml-4">
        <span className="text-xs text-gray-400 mr-4">
          {formatDuration(item.metadata.duration)}
        </span>
       
      </div>
    </div>
  );
};

export default ListCompo;