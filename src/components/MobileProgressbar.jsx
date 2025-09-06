// MobileProgressBar.jsx
import React, { useEffect, useState } from "react";

const MobileProgressBar = ({ sound, className }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (sound) setDuration(sound.duration());
  }, [sound]);

  useEffect(() => {
    let interval;
    if (sound) {
      interval = setInterval(() => {
        setCurrentTime(sound.seek() || 0);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [sound]);

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    sound.seek(seekTime);
    setCurrentTime(seekTime);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full flex  gap-x-2 overflow-hidden ${className}`}>
      <div className="relative w-full h-2 flex items-center group">
        <div className="absolute bottom-0 w-full h-1 bg-neutral-700 rounded-b-md "></div>
        {/* Fill/progress bar */}
        <div
          className="absolute bottom-0 h-1 bg-white m-0 transition-all duration-200"
          style={{
            width: `${progressPercent}%`,
          }}
        ></div>
        <input
          type="range"
          value={currentTime}
          min={0}
          step={0.01}
          max={duration}
          onChange={handleSeek}
          className="w-full h-2 opacity-0 absolute left-0 top-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileProgressBar;
