// import React from 'react';
// import ReactAudioPlayer from 'react-audio-player';

// const Player = () => {
//   return (
//     <div>
//       <ReactAudioPlayer
//         src="http://localhost:3001/stream/128k"
//         controls
//       />
//     </div>
//   );
// };



import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';



const Player = () => {
  const hostIp = import.meta.env.VITE_HOST_IP ;
  const streamUrl = `http://${hostIp}:3001/stream/256k`;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  console.log(streamUrl); 

  return (
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 p-6 mt-0 rounded-xl shadow-2xl w-full ">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl text-white font-semibold mb-4">Audio Player</h2>

          {/* Audio player component */}
          <ReactAudioPlayer
            src={streamUrl}
            controls
            className="w-full rounded-md bg-white p-3 shadow-lg"
          />

          
        </div>
      </div>
    
  );
};




export default Player;