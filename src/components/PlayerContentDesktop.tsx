
import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { FaPlay } from "react-icons/fa";
import { IoPause, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import MobileViewPlayer from "./PlayerContentDesktop";
interface PlayerContentProps {
  song: Song;
  songPath: string;
}
const PlayerContentDesktop = ({ song, songPath }: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [fullScreen,setFullScreen]=useState(false)
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
      <div className="hidden md:flex p-4 items-center justify-between box-border max-h-full ">
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

        <div className=" flex gap-x-7  justify-center w-full  ">
          <button
            className=" active:scale-110  cursor-pointer scale-90 text-neutral-400 hover:text-white"
            onClick={onPlayPrev}
          >
            <IoPlaySkipBack size={28} />
          </button>
          <button
            onClick={handlePlay}
            className=" active:bg-white/10 hover:bg-white/10 rounded-full p-3 cursor-pointer active:scale-110 text-neutral-400 hover:text-white"
          >
            {!playing ? <FaPlay size={28} /> : <IoPause size={32} />}
          </button>
          <button
            className=" active:scale-110  cursor-pointer scale-90 text-neutral-400 hover:text-white"
            onClick={onPlayNext}
          >
            <IoPlaySkipForward size={28} />
          </button>
        </div>
        {/* Sound Player */}
        <div className="flex w-full items-center justify-end ">
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
