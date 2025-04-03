import React, { useContext } from 'react';
import { PlayerContext } from './PlayerContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaMusic } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import ProgressBar from './progressBar';

const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    togglePlayerView,
    progress,
    duration,
    playNextTrack,
    playPreviousTrack,
    queue = [],
    handleSeek,
    isExpanded
  } = useContext(PlayerContext);

  if (!currentTrack ) return null;

  return (
    <div 
      className="fixed bottom-16  left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 z-40 transition-all "
      // onClick={togglePlayerView} 
    >
      <div className="flex items-center justify-between  px-1 ">
        {/* Track info */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Album Art */}
           <div className="flex-shrink-0 mx-2 mt-2 w-10 h-10 rounded-md overflow-hidden bg-gray-700">
                {currentTrack.coverUrl ? (
                  <img src={currentTrack.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaMusic size={14} />
                  </div>
                )}
              </div>
          
          {/* Song Details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 mx-4">
          {queue.length > 0 && (
            <div className="flex items-center text-xs text-teal-400 mr-2">
              <MdQueueMusic className="mr-1" size={16} />
              <span>{queue.length}</span>
            </div>
          )}

          <button 
            onClick={(e) => {
              e.stopPropagation();
              playPreviousTrack();
            }}
            className="text-gray-300 hover:text-white transition-colors p-1"
            aria-label="Previous track"
          >
            <FaStepBackward size={14} />
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className={`p-2 rounded-full ${isPlaying ? 'bg-teal-500' : 'bg-white'} text-black shadow-sm hover:scale-105 transition-transform`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-0.5" />}
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              playNextTrack();
            }}
            className="text-gray-300 hover:text-white transition-colors p-1"
            aria-label="Next track"
          >
            <FaStepForward size={14} />
          </button>
        </div>
        
      </div>
      <div className="px-4">
        <ProgressBar 
          progress={progress} 
          duration={duration} 
          onSeek={handleSeek} 
          miniMode={true}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;