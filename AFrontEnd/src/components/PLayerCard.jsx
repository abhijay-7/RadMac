import React, {useState,useEffect,useRef} from 'react'
import { use } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {  useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import NonLivePlayer from './nonLivePlayer';
import ProgressBar from './progressBar';
import { FaPause, FaPlay } from "react-icons/fa";
const PLayerCard = () => {
  let song = useParams()
  song =song.id
  const [songData, setSongData] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const navigate = useNavigate()


  const Url = `/hi/get-song/${song}`
  const hostIp = import.meta.env.VITE_HOST_IP;
     const playerPort = import.meta.env.VITE_PLAYER_PORT
     const [bitrate, setBitrate] = useState('320k');
     ;
     

 
     const [streamUrl, setStreamUrl] = useState(Url);
     const [metaUrl, setmetaUrl] = useState();
     const [isPlaying, setIsPlaying] = useState(false);
 
     useEffect(() => {
      // Update stream URL when song changes
      const newStreamUrl = `/hi/get-song/${song}`;
      setStreamUrl(newStreamUrl);
  
      console.log("Updated stream URL:", newStreamUrl);
    }, [song]); // Runs every time `song` changes
  
 

    //  const handleSelect = (event) => {
    //      setBitrate(event.target.value);
    //  };
    //  console.log(streamUrl);
 

    useEffect(() => {
      const metaUrl = `/hi/SongMeta/${song}`; // Dynamically create meta URL
    
      console.log(metaUrl, "nlSbox");
    
      const fetchSong = async () => {
        try {
          const response = await axios.get(metaUrl);
          if (JSON.stringify(response.data) !== JSON.stringify(songData)) { 
            // Only update state if data is different
            setSongData(response.data);
          }
        } catch (error) {
          console.error("Error fetching song data:", error);
        }
      };
    
      fetchSong();
    }, [song]); // Re-run when `song` changes
    

    const imgUrls = [
      "https://i.ibb.co/XrHn9K5P/pexels-polinachistyakova-16353919.jpg",
      "https://i.ibb.co/qYfJbwzR/pexels-anniroenkae-2693200-1.jpg",
      "https://i.ibb.co/b5syK2TG/pexels-bymalens-2157896.jpg",
      "https://i.ibb.co/8gCyCyJx/pexels-bymalens-2157897-1.jpg",
      "https://i.ibb.co/xqQZWgzr/pexels-simeon-theartist-7861711.jpg",
  
    ];
  
    const getRandomValue = (input, range) => {
      // Convert any input to string
      const inputStr = String(input);
      
      // Simple hash function to convert string to numeric seed
      let hash = 0;
      for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32-bit integer
      }
      hash = Math.abs(hash);
    
      // Deterministic pseudo-random number generation
      const randomValue = (hash * 9301 + 49297) % range;
      return Math.abs(randomValue);
    };
  
    if (!songData) {
      console.log(metaUrl)
      return <div>Loading...</div>;
    }
  
    // console.log(songData);
    const { title, artist, album, coverUrl, id, duration } = songData;
    // console.log(id);
  


    
   
  // Handle Play/Pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update Progress Bar in Real Time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Handle Audio Load to Get Duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleNext = () => {
    const nextSong = parseInt(song) + 1;  
    navigate(`/play/${nextSong}`);  
    setProgress(0);  
  //there should be some dely to load the song on react 
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();  // Reload 
        audioRef.current.play();  // Play 
        setIsPlaying(true);
      }
    }, 500);  // Small delay to allow React to update state
  };
  
  const handlePre = () => {
    let prevSong = parseInt(song) -1;  
    {(prevSong<0)?prevSong=0:prevSong}
    console.log("prevsong" , prevSong)
    navigate(`/play/${prevSong}`);  
    setProgress(0);  
  //there should be some dely to load the song on react 
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();  // Reload 
        audioRef.current.play();  // Play 
        setIsPlaying(true);
      }
    }, 500);  //  delay 500
  };
  

  // Seek When Clicking Progress Bar
  const handleSeek = (e) => {
    if (audioRef.current) {
      const clickX = e.nativeEvent.offsetX;
      const progressBarWidth = e.target.clientWidth;
      const newTime = (clickX / progressBarWidth) * duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / duration) * 100);
    }
  };

  // Auto Stop When Audio Ends
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };
  if(!songData) return <div>Loading...</div>;

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br px-4">
    <div className="bg-gray-900  py-8 px-4 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-700/50 h-[85vh] min-h-[600px]">
{/* Album Art */}
      <div className="relative pt-[100%] overflow-hidden w-72 h-80 mx-auto rounded-lg mb-4 mt-8 shadow-lg shadow-teal-50">
        <img 
          src={imgUrls[getRandomValue(id, imgUrls.length)]} 
          alt={`${songData.title} - ${songData.artist}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Song Info */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white truncate">{songData.title}</h2>
        <p className="text-gray-400 mt-1">{songData.artist}</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} duration={duration} onSeek={handleSeek} />


      {/* Controls */}
      <div className="p-6 flex items-center justify-center space-x-8">
        <button 
          onClick={handlePre}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
          aria-label="Previous track"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" transform="matrix(-1, 0, 0, 1, 0, 0)">
            <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" />
            <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" />
          </svg>
        </button>

        <button 
          onClick={handlePlayPause}
          className="p-5 rounded-full bg-white hover:bg-teal-50 transition-colors text-black shadow-lg shadow-white-teal-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-0.5" />}
        </button>

        <button 
          onClick={handleNext}
          className="p-3 rounded-full bg-gray-700 transition-colors text-gray-300 "
          aria-label="Next track"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" />
            <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" />
          </svg>
        </button>
        
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={streamUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  </div>
    </>
  )
}

export default PLayerCard