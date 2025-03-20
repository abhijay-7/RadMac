import React from "react";

const ProgressBar = ({ progress, duration, onSeek }) => {
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full mt-2">
      {/* Clickable Progress Bar */}
      <div
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={onSeek}
      >
        <div
          className="h-2 bg-teal-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Time Info */}
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{formatTime((progress / 100) * duration)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
