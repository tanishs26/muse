import React, { useState, useRef, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
import { RxCaretDown } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";
import MobileProgressBar from "./MobileProgressbar";
import { FastAverageColor } from "fast-average-color";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
interface PlayerContentProps {
  song: Song;
  songPath: string;
  fullScreen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const PlayerContentMobile = ({
  fullScreen,
  onClose,
  onOpen,
  song,
  songPath,
}: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [playing, setPlaying] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState("rgb(0,0,0)");
  const lastPlayedSongId = useRef<number | string | null>(null);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  useEffect(() => {
    if (!imgRef.current) return;
    const fac = new FastAverageColor();
    fac
      .getColorAsync(imgRef.current)
      .then((color) => setBgColor(color.rgb))
      .catch(() => setBgColor("rgb(0,0,0)"));
  }, [imagePath]);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const index = player.ids.findIndex((id) => id === player.activeId);
    const next = player.ids[index + 1] || player.ids[0];
    player.setId(next);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) return;
    const index = player.ids.findIndex((id) => id === player.activeId);
    const prev = player.ids[index - 1] || player.ids[player.ids.length - 1];
    player.setId(prev);
  };

  const [play, { pause, sound }] = useSound(songPath, {
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
    <AnimatePresence>
      {fullScreen ? (
        <div
          className="fixed inset-0  h-full z-50 transition  duration-1000"
          style={{
            background: `linear-gradient(to bottom,${bgColor},#000000)`,
          }}
        >
          <button
            className="w-[50px]  mt-0 absolute left-2 top-0 active:bg-white/30 flex items-center rounded-full p-2 transition"
            onClick={onClose}
          >
            <RxCaretDown size={38} />
          </button>

          <div className="mt-24 mx-auto rounded-lg w-[360px] h-[360px] relative overflow-hidden">
            <img
              ref={imgRef}
              src={imagePath || "/liked.png"}
              alt="hidden-color-src"
              crossOrigin="anonymous"
              className="hidden"
            />
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
          <div className="px-10 mt-10 left-0.5 transform -translate-x-0.5 ">
            <ProgressBar className={""} sound={sound} />
          </div>

          <div className="flex gap-x-9 justify-center w-full mt-15">
            <button
              className="active:scale-110 cursor-pointer scale-90 text-neutral-400 hover:text-white"
              onClick={onPlayPrev}
            >
              <IoPlaySkipBack size={30} />
            </button>
            <button
              onClick={handlePlay}
              className=" hover:bg-white/10 rounded-full border-2  text-black bg-white p-4 hover:text-white"
            >
              {!playing ? <IoPlay size={45} /> : <IoPause size={45} />}
            </button>
            <button
              className="active:scale-110 cursor-pointer scale-90 text-neutral-400 hover:text-white"
              onClick={onPlayNext}
            >
              <IoPlaySkipForward size={30} />
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex absolute bottom-18 bg-black/80 py-2 h-[60px] rounded-md left-[50%] transform -translate-x-1/2 w-[90%] z-40 overflow-hidden"
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
                <h1 className="font-semibold text-white text-md">
                  {song?.title}
                </h1>
                <p className="text-sm mb-0.5 text-neutral-300">
                  {song?.author}
                </p>
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
                {!playing ? <IoPlay size={32} /> : <IoPause size={32} />}
              </button>
            </div>
          </div>
          <MobileProgressBar
            className={" overflow-hidden absolute bottom-0 m-0 p-0 w-full"}
            sound={sound}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerContentMobile;
