import React, { useEffect, useState } from "react";
const ProgressBar = ({ sound, className }) => {
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
    <div
      className={`w-full flex justify-center h-2 relative items-center group overflow-hidden  ${className}`}
    >
      <span className="fixed left-10 top-4  text-xs text-neutral-300 whitespace-nowrap">
        {formatTime(currentTime)}
      </span>
      <div
        className={`w-full h-1 bg-neutral-400 absolute bottom-1 cursor-pointer rounded-md  `}
      ></div>
      <div
        style={{ width: `${progress}%` }}
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

      <span className="fixed right-10 top-4  text-xs text-neutral-300 whitespace-nowrap">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;
