import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import {  FaPause, FaPlay } from "react-icons/fa";
import {  IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
import { RxCaretDown } from "react-icons/rx";

interface PlayerContentProps {
  song: Song;
  songPath: string;
  onClose: () => void;
}
const PlayerContentMobile = ({
  song,
  songPath,
  onClose,
}: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [playing, setPlaying] = useState(false);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const nextSong = player.ids[currentSongIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };
  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const prevSong = player.ids[currentSongIndex - 1];
    const length = player.ids.length;
    if (!prevSong) {
      return player.setId(player.ids[length - 1]);
    }
    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songPath, {
    
    onplay: () => setPlaying(true),
    onend: () => {
      setPlaying(false), onPlayNext();
    },
    onpause: () => {
      setPlaying(false);
    },
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
    <div className="fixed inset-0 bg-gradient-to-b from-black to-gray-600 h-[100%]    ">
      <button
        className=" w-[50px] absolute left-5  active:bg-white/30 flex items-center rounded-full py-6 transition "
        onClick={onClose}
      >
        <RxCaretDown size={38} />
      </button>
      <div className=" mt-25 left-[50%] m-0 transform -translate-x-1/2 rounded-lg w-[360px] h-[360px] relative overflow-hidden ">
        <Image src={imagePath || "/liked.png"} fill alt="No img" />
      </div>
      {/* Auhtor title */}
      <div className="w-full flex items-center relative">
        <div className="px-8 flex flex-col sm:items-center  items-start truncate mt-10">
          <h1 className="font-bold  text-white text-2xl">{song?.title}</h1>
          <p className="text-lg  mb-0.5 text-neutral-300">{song?.author}</p>
        </div>
        <div className="absolute right-0 mr-8 top-12  ">
          <LikedButton songId={song?.id} />
        </div>
      </div>
      {/* Player Controls */}
      <div className=" flex gap-x-9  justify-center w-full  ">
          <button
            className=" active:scale-110  cursor-pointer scale-90 text-neutral-400 hover:text-white"
            onClick={onPlayPrev}
          >
            <IoPlaySkipBack size={30} />
          </button>
          <button
            onClick={handlePlay}
            className=" active:bg-white/10 hover:bg-white/10 rounded-full  active:scale-110 text-neutral-400 p-4 hover:text-white"
          >
            {!playing ? <FaPlay size={38} /> : <FaPause size={38} />}
          </button>
          <button
            className=" active:scale-110  cursor-pointer scale-90 text-neutral-400 hover:text-white"
            onClick={onPlayNext}
          >
            <IoPlaySkipForward size={30} />
          </button>
        </div>
        
    </div>
  );
};

export default PlayerContentMobile;
