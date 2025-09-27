"use client"
import React, { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const Position = () => {
  const posiArray = [
    "Drop the beat",
    "Own the vibe.",
    "Unapologetically loud",
    "chase every high",
  ];
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % posiArray.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <motion.span
      key={count}
      initial={{
        filter: "blur(10px)",
        opacity: 0,
        y: -20,
        x: 0,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        x: [-2, 2, -2, 2, 0],
      }}
      className="p-2 text-sm md:text-[15px]  tracking-wide text-orange-500 dark:text-secondary py-1 inline-block rounded-lg border-gray-400  bg-orange-400/10 "
    >
      {posiArray[count]}
    </motion.span>
  );
};

export default Position;
