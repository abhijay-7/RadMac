import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { use } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(null);

  
  const fetchTrackData = async (trackId) => {
    try {
      const metaUrl = `/hi/SongMeta/${trackId}`;
      const response = await axios.get(metaUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching song data:", error);
      return null;
    }
  };


  const playTrack = async (trackId) => {
    const trackData = await fetchTrackData(trackId);
    if (!trackData) return;
    
    setCurrentTrack({
      ...trackData,
      audioUrl: `/hi/get-song/${trackId}`
    });
    setIsPlaying(true);
    setIsExpanded(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const togglePlayerView = () => {
    setIsExpanded(!isExpanded);
    // If you want to navigate to the full player URL:
    if (!isExpanded && currentTrack) {
      navigate(`/play/${currentTrack.id}`);
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const clickX = e.nativeEvent.offsetX;
      const progressBarWidth = e.target.clientWidth;
      const newTime = (clickX / progressBarWidth) * duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / duration) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    // Auto-play next track if available
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      playTrack(nextTrack.id);
    }
  };

  const playNextTrack = () => {
    if (!currentTrack) return;
    const nextId = parseInt(currentTrack.id) + 1;
    playTrack(nextId);
  };

  const playPreviousTrack = () => {
    if (!currentTrack) return;
    const prevId = Math.max(0, parseInt(currentTrack.id) - 1);
    playTrack(prevId);
  };

  // Effect to handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  // Effect to handle play/pause
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        togglePlay,
        isExpanded,
        togglePlayerView,
        progress,
        duration,
        handleSeek,
        playTrack,
        playNextTrack,
        playPreviousTrack,
        queue ,
        addToQueue: (track) => setQueue([...queue, track])
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        preload="metadata"
      />
    </PlayerContext.Provider>
  );
};