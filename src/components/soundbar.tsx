"use client";
import React, { useState, useEffect } from "react";

const AudioVisualizer = ({ isPlaying = true, numBars=5}) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Reset animation when isPlaying changes
    if (isPlaying) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isPlaying]);

  const generateBars = () => {
    const bars = [];
    for (let i = 0; i < numBars; i++) {
      const animationDelay = (i * 0.1).toFixed(2); // in seconds
      const animationDuration = (0.5 + Math.random() * 3).toFixed(2); // in seconds
      const maxScale = Math.random() * 1;

      bars.push(
        <div
          key={`${animationKey}-${i}`}
          className={`visualizer-bar ${isPlaying ? "playing" : ""}`}
          style={{
            height: "40px",
            animationDelay: `${animationDelay}s`,
            animationDuration: `${animationDuration}s`,
            transform: `scaleY(${maxScale})`,
          }}
        />
      );
    }
    return bars;
  };

  return <div className="visualizer-wrapper">{generateBars()}</div>;
};

export default AudioVisualizer;
