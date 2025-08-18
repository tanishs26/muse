import React, { useEffect, useState } from "react";
const ProgressBarDesktop = ({ sound, className }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (sound) {
      setDuration(sound.duration());
    }
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
    return ` ${m}:${s < 10 ? "0" : ""}${s} `;
  };
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="w-full flex flex-col items-center absolute">
      <div
        className={`w-[100%] flex  h-2 relative items-center group overflow-hidden  ${className}`}
      >
        <div
          className={`w-full h-1 bg-neutral-400 absolute bottom-1  cursor-pointer rounded-md  `}
        ></div>
        <div
          style={{ width: `${progress}%`}}
          className={` h-1 left-0 rounded-l-md bg-white absolute bottom-1 m-0 cursor-pointer transition-all duration-200`}
        ></div>
        <input
          type="range"
          value={currentTime}
          max={duration}
          min={0}
          step={0.01}
          onChange={handleSeek}
          className="w-full h-2 absolute bottom-1 left-0 opacity-0 cursor-pointer "
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="flex justify-start text-sm text-neutral-300 whitespace-nowrap">
          {formatTime(currentTime)}
        </span>
        <span className="flex justify-end text-sm text-neutral-300 whitespace-nowrap">
        {formatTime(duration)}
      </span>
      </div>
      
    </div>
  );
};

export default ProgressBarDesktop;
