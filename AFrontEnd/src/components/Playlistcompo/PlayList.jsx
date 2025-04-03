import React from "react";
import { useNavigate } from "react-router-dom";

const PlaylistList = ({ playlist }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      
        <div
          key={playlist._id}
          onClick={() => navigate(`/playlist/${playlist._id}`)}
          className="flex items-center py-3 gap-x-1  hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
        >
          {/* Cover Art */}
          <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img
              src={playlist.coverArt || 'default-playlist-cover.jpg'}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Playlist Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{playlist.name}</h3>
            <p className="text-xs text-gray-400">
              {playlist.songs?.length || 0} songs • {playlist.accessType}
            </p>
          </div>
        </div>
      
    </div>
  );
};

export default PlaylistList;