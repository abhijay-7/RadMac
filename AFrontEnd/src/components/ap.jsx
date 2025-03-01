import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);  // To reference the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // Update the duration when the audio is loaded
    const audio = audioRef.current;
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setSliderValue(audio.currentTime / duration * 100);
    };

    // Attach event listeners
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);

    // Cleanup on component unmount
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [duration]);

  // Handle Play/Pause button
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Slider change
  const handleSliderChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    setSliderValue(value);
    audio.currentTime = (value / 100) * duration;
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="http://localhost:3001/stream/128k"
        controls={false} // Disable the default audio controls
        preload="auto"
      />
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
