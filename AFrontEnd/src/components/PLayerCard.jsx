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

 

  return (
    <>
    
    {/* <!-- component --> */}
<div class=" px-4 justify-center items-center h-screen">
  <div class="bg-gray-900 p-8 rounded-lg shadow-md sm:h-[90%] md:w-64 sm:min-w-8 ">
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
   
      <button onClick={handlePre} class="p-3 mx-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <svg width="64px" height="64px" viewBox="0 0 24 24" class="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
            <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
          </g>
        </svg>
      </button>

      <button onClick={handlePlayPause} class="p-6 mx-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ">
      {
        isPlaying?<FaPause fill='black'/>:<  FaPlay fill='black'/>
      }
      </button>
      <button  onClick={handleNext} class="p-3 mx-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <svg width="64px" height="64px" viewBox="0 0 24 24" class="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
            <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
          </g>
        </svg>
      </button>
    </div>
    {/* Progress Bar Component */}
    <ProgressBar progress={progress} duration={duration} onSeek={handleSeek} />
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

export default PLayerCard