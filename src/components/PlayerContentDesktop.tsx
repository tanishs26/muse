import React, { useState, useEffect, useRef } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeat,
} from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import ProgressBarDesktop from "./ProgressBarDesktop";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AudioVisualizer from "./soundbar";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

interface PlayerContentProps {
  song: Song;
  songPath: string;
  volume: number;
  repeat: boolean;
  handleRepeat: () => void;
  handleVolume: (value: number) => void;
}
const PlayerContentDesktop = ({
  song,
  songPath,
  volume,
  repeat,
  handleRepeat,
  handleVolume,
}: PlayerContentProps) => {
  const lastPlayedSongId = useRef<number | string | null>(null);
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [playing, setPlaying] = useState(false);
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const [showVisuals, setVisuals] = useState(true);

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
    onplay: () => {
      setPlaying(true);
      (async () => {
        if (user && song && lastPlayedSongId.current !== song?.id) {
          lastPlayedSongId.current = song.id;
          const { data, error } = await supabaseClient.from("history").insert({
            song_id: song.id,
            played_at: new Date(),
            user_id: user?.id,
          });
          if (error) {
            alert(error.message);
          } else {
            console.log(data);
          }
        }
      })();
    },
    onpause: () => {
      setPlaying(false);
    },
    format: ["mp3"],
  });
  useEffect(() => {
    if (!sound) return;

    const handleEnd = () => {
      if (repeat) {
        sound.seek(0);
        sound.play();
      } else {
        onPlayNext();
      }
    };

    sound.on("end", handleEnd);
    return () => {
      sound.off("end", handleEnd);
    };
  }, [sound, repeat]);

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
      handleVolume(1);
    } else {
      handleVolume(0);
    }
  };
  // Inside PlayerContentDesktop component
  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      if (el.isContentEditable) return true;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isEditable(e.target)) {
        e.preventDefault();
        handlePlay();
      } else if (e.code === "ArrowRight" && !isEditable(e.target)) {
        onPlayNext();
      } else if (e.code === "ArrowLeft" && !isEditable(e.target)) {
        onPlayPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePlay, onPlayNext, onPlayPrev]);

  return (
    <div className="w-full h-full bg-black/60 relative ">
      {showVisuals && (
        <motion.div
          initial={{
            y: 600,
            opacity: 0,
            filter: "blur(20px)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            ease: "easeInOut",
          }}
          className="w-[400px] h-[500px]  absolute -top-130 right-10 rounded-lg overflow-hidden shadow-md shadow-neutral-800 group transition-all duration-300 ease-in-out"
        >
          <RxCaretDown
            className="fixed right-5 top-5 z-59 cursor-pointer hover:bg-neutral-100/15  rounded-full active:scale-90"
            onClick={() => setVisuals(!showVisuals)}
            size={36}
          />

          <Image
            fill
            src={imagePath || "/liked.png"}
            alt="no-img"
            className=" group-hover:blur-[3px]"
          />
          <div className="inset-0 bg-black/60 z-10 absolute"></div>
          <div className="z-50 fixed top-15 left-8 flex gap-4 drop-shadow-2xl">
            <Image
              width={100}
              height={100}
              src={imagePath || "/liked.png"}
              alt="no-img"
              className="rounded-md shadow-2xl"
            />
            <div className=" mt-4">
              <h3 className="text-3xl font-semibold hover:underline cursor-pointer">
                {song.title}
              </h3>
              <h3 className="text-lg font-medium text-neutral-300 ">
                <span className="text-neutral-400">Single &bull;</span>{" "}
                {song.author}
              </h3>
            </div>
          </div>
          <button
            onClick={handlePlay}
            className="z-50 fixed top-45 right-8 hidden group-hover:block  cursor-pointer hover:bg-black/10 rounded-full p-2 text-neutral-400 hover:text-white transition-all duration-300 "
          >
            {!playing ? <IoPlay size={35} /> : <IoPause size={35} />}
          </button>

          <div className="z-50 absolute bottom-0  text-white   drop-shadow-2xl flex  gap-1 w-full mx-auto ">
            {Array.from({ length: 15 }).map((_, idx) => {
              return <AudioVisualizer key={idx} isPlaying={playing} />;
            })}
          </div>
        </motion.div>
      )}

      <div className="hidden w-full h-full md:flex p-4 backdrop-blur-sm border-t-1 border-t-white/20  bg-gray-900/10 items-center max-h-full ">
        {/* Author and title */}
        <div className=" w-1/3 flex gap-x-2  items-center">
          <div className="w-[60px] h-[60px]  relative rounded-md shadow-md  overflow-hidden  ">
            <Image fill src={imagePath || "/liked.png"} alt="No Img" sizes="" />
          </div>
          <div className="flex flex-col ml-4">
            <h1 className="font-semibold text-white text-lg truncate">
              {song?.title}
            </h1>
            <p className="text-md truncate text-neutral-300">{song?.author}</p>
          </div>
        </div>

        {/* //Player Controls */}

        <div className=" flex space-x-6  transition-all duration-300 justify-center items-center mr-4 ">
          <button
            className=" active:scale-110  cursor-pointer  text-neutral-300 hover:text-white"
            onClick={onPlayPrev}
            title="previous"
          >
            <IoPlaySkipBack size={28} />
          </button>
          <button
            onClick={handlePlay}
            className="p-3 active:bg-white/10 hover:bg-white/10 rounded-full cursor-pointer  text-neutral-300 hover:text-white transition-all duration-300 "
          >
            {!playing ? <IoPlay size={35} /> : <IoPause size={35} />}
          </button>
          <button
            className="active:scale-110 mr-4 cursor-pointer  text-neutral-300 hover:text-white"
            onClick={onPlayNext}
          >
            <IoPlaySkipForward size={28} />
          </button>
          <div className="w-full relative flex mt-4  items-center justify-between">
            <ProgressBarDesktop className={""} sound={sound} />
          </div>
        </div>
        {/* {progress bar} */}

        {/* Sound Player */}
        <div className="flex flex-1  text-neutral-300 items-center justify-end space-x-4 mx-auto ">
          {!showVisuals && (
            <RxCaretUp
              className=" cursor-pointer hover:bg-neutral-100/15  rounded-full active:scale-90"
              onClick={() => setVisuals(true)}
              size={36}
            />
          )}
          {repeat ? (
            <IoRepeat
              size={30}
              className="text-orange-500 cursor-pointer"
              onClick={handleRepeat}
            />
          ) : (
            <IoRepeat
              onClick={handleRepeat}
              size={30}
              className="text-neutral-300 cursor-pointer"
            />
          )}
          <LikedButton
            songId={song?.id}
            className="scale-95 mt-0.5 text-neutral-300"
          />
          <VolumeIcon
            size={24}
            onClick={toggleMute}
            className="cursor-pointer text-neutral-300"
          />
          <Slider value={volume} onChange={handleVolume} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContentDesktop;
