import React, { useState, useEffect, useRef, useContext } from 'react';
import { PlayerContext } from './PlayerContext';
import { FaPause, FaPlay, FaStepForward, FaStepBackward, FaRandom, FaRedo } from "react-icons/fa";
import { MdQueueMusic, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import ProgressBar from './progressBar';

const PlayerCard = ({fullMode = false}) => {
  
 
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    isExpanded,
    togglePlayerView,
    playNextTrack,
    playPreviousTrack,
    progress,
    duration,
    handleSeek,
    queue
  } = useContext(PlayerContext);

   // Close full player and return to previous route
   const handleClose = () => {
    togglePlayerView();
    navigate(-1); // Go back to previous page
  };

  if (!fullMode || !isExpanded || !currentTrack) return null;


  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const imgUrls = [
    "https://i.ibb.co/XrHn9K5P/pexels-polinachistyakova-16353919.jpg",
    "https://i.ibb.co/qYfJbwzR/pexels-anniroenkae-2693200-1.jpg",
    "https://i.ibb.co/b5syK2TG/pexels-bymalens-2157896.jpg",
    "https://i.ibb.co/8gCyCyJx/pexels-bymalens-2157897-1.jpg",
    "https://i.ibb.co/xqQZWgzr/pexels-simeon-theartist-7861711.jpg",
  ];

  const getRandomValue = (input, range) => {
    const inputStr = String(input);
    let hash = 0;
    for (let i = 0; i < inputStr.length; i++) {
      const char = inputStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    hash = Math.abs(hash);
    const randomValue = (hash * 9301 + 49297) % range;
    return Math.abs(randomValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          return newTime > duration ? duration : newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  if (!currentTrack || !isExpanded) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-900/80 py-8 px-6 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700/50 h-[85vh] min-h-[600px] flex flex-col">
        {/* Header with queue and close button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {queue.length > 0 && (
              <div className="flex items-center text-sm text-teal-400">
                <MdQueueMusic className="mr-1" size={20} />
                <span>{queue.length} in queue</span>
              </div>
            )}
          </div>
          <button 
            onClick={handleClose  }
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Minimize player"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 15L12 8L19 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Album Art */}
        <div className="relative pt-[100%] overflow-hidden w-full mx-auto rounded-xl mb-6 shadow-lg shadow-teal-500/20">
          <img 
            src={imgUrls[getRandomValue(currentTrack.id, imgUrls.length)]} 
            alt={`${currentTrack.title} - ${currentTrack.artist}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="px-4 text-center mb-6">
          <h2 className="text-2xl font-bold text-white truncate mb-1">{currentTrack.title}</h2>
          <p className="text-gray-400">{currentTrack.artist}</p>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-2xl text-gray-400 hover:text-red-500 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <MdFavorite className="text-red-500" /> : <MdFavoriteBorder />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <ProgressBar progress={progress} duration={duration} onSeek={handleSeek} />
        </div>

        {/* Controls */}
        <div className="mt-auto px-4">
          <div className="flex justify-center space-x-8 mb-6">
            <button 
              onClick={() => setIsShuffleOn(!isShuffleOn)}
              className={`text-xl ${isShuffleOn ? 'text-teal-400' : 'text-gray-400'} hover:text-teal-300 transition-colors`}
              aria-label={isShuffleOn ? "Shuffle on" : "Shuffle off"}
            >
              <FaRandom />
            </button>

            <button 
              onClick={playPreviousTrack}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
              aria-label="Previous track"
            >
              <FaStepBackward size={18} />
            </button>

            <button 
              onClick={togglePlay}
              className="p-5 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors text-white shadow-lg shadow-teal-500/30"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-0.5" />}
            </button>

            <button 
              onClick={playNextTrack}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
              aria-label="Next track"
            >
              <FaStepForward size={18} />
            </button>

            <button 
              onClick={() => setIsRepeatOn(!isRepeatOn)}
              className={`text-xl ${isRepeatOn ? 'text-teal-400' : 'text-gray-400'} hover:text-teal-300 transition-colors`}
              aria-label={isRepeatOn ? "Repeat on" : "Repeat off"}
            >
              <FaRedo />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;