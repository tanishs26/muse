import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import {IoPlay, IoPause, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import MobileViewPlayer from "./PlayerContentDesktop";
import ProgressBarDesktop from "./ProgressBarDesktop";
interface PlayerContentProps {
  song: Song;
  songPath: string;
}
const PlayerContentDesktop = ({ song, songPath }: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [volume, setVolume] = useState(0.8);
  const [playing, setPlaying] = useState(false);
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

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
    volume: volume,
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
    console.log("Desktop triggered");
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
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  return (
    <div className="w-full">
      <div className="hidden w-full md:flex p-4 items-center   max-h-full ">
        {/* Author and title */}
        <div className="flex ml-4 w-full">
          <div className="w-[60px] h-[60px] relative  flex  rounded-md  overflow-hidden  ">
            <Image
              fill
              src={imagePath || "/liked.png"}
              alt="No Img"
              className=""
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1 className="font-semibold text-white text-lg truncate">
              {song?.title}
            </h1>
            <p className="text-md truncate text-neutral-300">{song?.author}</p>
          </div>
        </div>

        {/* //Player Controls */}

        <div className=" flex w-[500px] relative justify-center items-center mr-4 ">
          <button
            className=" active:scale-110 left-0  absolute cursor-pointer  text-neutral-400 hover:text-white"
            onClick={onPlayPrev}
          >
            <IoPlaySkipBack size={28} />
          </button>
          <button
            onClick={handlePlay}
            className="p-3 active:bg-white/10 hover:bg-white/10 rounded-full cursor-pointer  text-neutral-400 hover:text-white"
          >
            {!playing ? <IoPlay size={35} /> : <IoPause size={35} />}
          </button>
          <button
            className="right-0 absolute active:scale-110  cursor-pointer  text-neutral-400 hover:text-white"
            onClick={onPlayNext}
          >
            <IoPlaySkipForward size={28} />
          </button>
        </div>
        <div className="w-full">
          <ProgressBarDesktop className={"relative w-full "} sound={sound} />
        </div>

        {/* Sound Player */}
        <div className="flex w-[50%] items-center  gap-x-4 justify-end ">
          <LikedButton songId={song?.id} />
          <VolumeIcon
            size={24}
            onClick={toggleMute}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContentDesktop;
