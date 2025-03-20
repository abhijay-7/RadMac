import React, {useState,useEffect,useRef} from 'react'
import { use } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {  useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import NonLivePlayer from './nonLivePlayer';
import ProgressBar from './progressBar';
import { FaPause, FaPlay } from "react-icons/fa";
const LivePlayerCard = () => {

  const [songData, setSongData] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const navigate = useNavigate()


  const Url = `/hi/stream/320k`
  const hostIp = import.meta.env.VITE_HOST_IP;
     const playerPort = import.meta.env.VITE_PLAYER_PORT
     const [bitrate, setBitrate] = useState('320k');
     ;
     

 
     const [streamUrl, setStreamUrl] = useState(Url);
     const [metaUrl, setmetaUrl] = useState();
     const [isPlaying, setIsPlaying] = useState(false);
 
     useEffect(() => {
      // Update stream URL when song changes
      const newStreamUrl = `/hi/stream/320k`;
      setStreamUrl(newStreamUrl);
  
      console.log("Updated stream URL:", newStreamUrl);
    }, []); // Runs every time `song` changes
  
 

    //  const handleSelect = (event) => {
    //      setBitrate(event.target.value);
    //  };
    //  console.log(streamUrl);
 

    useEffect(() => {
      const metaUrl = `/hi/LiveSongMeta/`; // Dynamically create meta URL
    
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
    }, []); // Re-run when `song` changes
    

    const imgUrls = [
      "https://i.ibb.co/XrHn9K5P/pexels-polinachistyakova-16353919.jpg",
      "https://i.ibb.co/qYfJbwzR/pexels-anniroenkae-2693200-1.jpg",
      "https://i.ibb.co/b5syK2TG/pexels-bymalens-2157896.jpg",
      "https://i.ibb.co/8gCyCyJx/pexels-bymalens-2157897-1.jpg",
      "https://i.ibb.co/xqQZWgzr/pexels-simeon-theartist-7861711.jpg",
  
    ];
  
    const getRandomValue = (inputNumber, range) => {
      // Use a deterministic approach for generating random number (e.g., using hash)
      const seed = inputNumber; // In practice, you could apply more complex logic for this
      const randomValue = (seed * 9304 + 49297) % 17; // A simple linear congruential generator
      const normalizedValue = randomValue / 17; // Normalize to [0, 1]
      return Math.floor(normalizedValue * range); // Map it to the given range
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
      setProgress(currentTime);
    }
  };

  // Handle Audio Load to Get Duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };


  
  

  // Seek When Clicking Progress Bar
  const handleSeek = (e) => {
    if (audioRef.current) {
      const clickX = e.nativeEvent.offsetX;
      const progressBarWidth = e.target.clientWidth;
      const newTime = (clickX / progressBarWidth) * duration;
      if(currentTime> newTime )
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

 

  return (
    <>
    
    {/* <!-- component --> */}
<div class=" flex px-4 justify-center items-center h-screen">
  <div class="bg-gray-900 p-8 rounded-lg shadow-md h-[90%] md:w-64 sm:min-w-8 ">
    {/* <!-- Album Cover --> */}
    <img  src={imgUrls[getRandomValue(id, imgUrls.length)]} alt="idk - Highvyn, Taylor Shin" class="w-80 h-80 mx-auto rounded-lg mb-4 mt-8 shadow-lg shadow-teal-50"/>
    {/* <!-- Song Title --> */}
    <h2 class="text-xl font-semibold  mt-16 text-center">{songData.title}</h2>
    {/* <!-- Artist Name --> */}
    <p class="text-gray-600 text-sm my-4 text-center ">{songData.artist}</p>
    {/* <!-- Music Controls --> */}
    <audio
        ref={audioRef}
        src={streamUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
    <div class="my-10 flex justify-center items-center">
   

      <button onClick={handlePlayPause} class="p-6 mx-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ">
      {
        isPlaying?<FaPause fill='black'/>:<  FaPlay fill='black'/>
      }
      </button>
      
    </div>
    {/* Progress Bar Component */}
    {/* <!-- Time Information --> */}
      {/* <div class="flex justify-between mt-2 text-sm text-gray-600">
        <span>1:57</span>
        <span>3:53</span>
      </div> */}
  </div>
</div>
    </>
  )
}

export default LivePlayerCard