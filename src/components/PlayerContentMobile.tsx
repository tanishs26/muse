import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
import { RxCaretDown } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerContentProps {
  song: Song;
  songPath: string;
}

const PlayerContentMobile = ({ song, songPath }: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const onClose = () => setFullScreen(false);
  const onOpen = () => setFullScreen(true);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const index = player.ids.findIndex(id => id === player.activeId);
    const next = player.ids[index + 1] || player.ids[0];
    player.setId(next);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) return;
    const index = player.ids.findIndex(id => id === player.activeId);
    const prev = player.ids[index - 1] || player.ids[player.ids.length - 1];
    player.setId(prev);
  };

  const [play, { pause, sound }] = useSound(songPath, {
    onplay: () => setPlaying(true),
    onend: () => {
      setPlaying(false);
      onPlayNext();
    },
    onpause: () => setPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {fullScreen ? (
        <motion.div
          key="fullscreen"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-b from-black to-gray-600 h-full z-50"
        >
          <button
            className="w-[50px] absolute left-5 top-5 active:bg-white/30 flex items-center rounded-full py-6 transition"
            onClick={onClose}
          >
            <RxCaretDown size={38} />
          </button>

          <div className="mt-24 mx-auto rounded-lg w-[360px] h-[360px] relative overflow-hidden">
            <Image src={imagePath || "/liked.png"} fill alt="No img" />
          </div>

          <div className="w-full flex items-center relative">
            <div className="px-8 flex flex-col sm:items-center items-start truncate mt-10">
              <h1 className="font-bold text-white text-2xl">{song?.title}</h1>
              <p className="text-lg text-neutral-300">{song?.author}</p>
            </div>
            <div className="absolute right-0 mr-8 top-12">
              <LikedButton songId={song?.id} />
            </div>
          </div>

          <div className="flex gap-x-9 justify-center w-full mt-10">
            <button
              className="active:scale-110 cursor-pointer scale-90 text-neutral-400 hover:text-white"
              onClick={onPlayPrev}
            >
              <IoPlaySkipBack size={30} />
            </button>
            <button
              onClick={handlePlay}
              className="active:bg-white/10 hover:bg-white/10 rounded-full active:scale-110 text-neutral-400 p-4 hover:text-white"
            >
              {!playing ? <FaPlay size={38} /> : <FaPause size={38} />}
            </button>
            <button
              className="active:scale-110 cursor-pointer scale-90 text-neutral-400 hover:text-white"
              onClick={onPlayNext}
            >
              <IoPlaySkipForward size={30} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="minimized"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex absolute bottom-18 bg-[#1d202b] py-2 h-[60px] rounded-md left-[50%] transform -translate-x-1/2 w-[90%] z-40"
        >
          <div className="md:hidden flex justify-between w-full items-center p-2">
            <div
              onClick={onOpen}
              className="flex flex-1 mr-4 justify-start items-center cursor-pointer"
            >
              <div className="rounded-md relative h-[45px] w-[45px] overflow-hidden">
                <Image fill src={imagePath || "/liked.png"} alt="No Img" />
              </div>
              <div className="ml-4 flex justify-between flex-col">
                <h1 className="font-semibold text-white text-md">{song?.title}</h1>
                <p className="text-sm mb-0.5 text-neutral-300">{song?.author}</p>
              </div>
            </div>
            <div className="flex gap-x-4 w-[100px] items-center">
              <div className="mt-1">
                <LikedButton songId={song?.id} />
              </div>
              <button
                onClick={handlePlay}
                className="flex justify-center items-center active:bg-white/10 hover:bg-white/10 p-2 rounded-full active:scale-110"
              >
                {!playing ? <FaPlay size={26} /> : <FaPause size={26} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerContentMobile;
