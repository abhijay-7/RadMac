import React, { useRef, useState, useEffect } from "react";

const MainTheme = () => {
  const audioRef = useRef(null); // Reference to the audio element
  const canvasRef = useRef(null); // Reference to the canvas htmlFor animations
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Set up the canvas context htmlFor animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to animate the music visualization
    const animate = () => {
      // Clear the previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animation logic: make a circle grow and move
      const time = Date.now() / 1000; // Time in seconds htmlFor animation speed

      const radius = Math.abs(Math.sin(time) * 50) + 20; // Make the circle size oscillate
      const x = canvas.width / 2 + Math.sin(time * 2) * 100; // Move circle left and right
      const y = canvas.height / 2 + Math.cos(time * 2) * 100; // Move circle up and down

      // Draw the animated circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(255, ${Math.abs(Math.sin(time) * 255)}, 150)`;
      ctx.fill();

      // Request the next frame htmlFor continuous animation
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Play the music when the component mounts
    const startMusic = () => {
      // audioRef.current.play();
      setIsPlaying(true);
    };

    // Pause the music when the component unmounts
    const pauseMusic = () => {
      // audioRef.current.pause();
      setIsPlaying(false);
    };

    if (isPlaying) {
      startMusic();
    } else {
      pauseMusic();
    }

    // Cleanup function
    return () => {
      pauseMusic();
    };
  }, [isPlaying]);

  return (
    <>
      return (
      <div>
        <h1>Continuous Animation with Music</h1>
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          style={{ border: "1px solid black" }}
        ></canvas>

        <audio ref={audioRef} src="path_to_your_music.mp3" preload="auto" />
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      )
    </>
  );
};

export default MainTheme;
