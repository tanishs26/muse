import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { useUser } from "@/hooks/useUser";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import ProgressBarDesktop from "./ProgressBarDesktop";
import { useSessionContext } from "@supabase/auth-helpers-react";

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
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

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
    if (song && user) {
      (async () => {
        const { data, error } = await supabaseClient
        .from("history")
        .insert({
          user_id: user.id,
          song_id: Number(song.id),
          played_at: new Date(),
        })
        .select();
        if (error) {
          alert("Not inserted to history");
        } else {
          console.log(data);
        }
        console.log("clicked baby:", song.id);
      })();
    }
    return () => {
      sound?.unload();
    };
  }, [sound,song,user,supabaseClient]);
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
    <div className="w-full h-full bg-white/20 ">
      <div className="hidden w-full h-full md:flex p-4 backdrop-blur-lg bg-gray-900/10 items-center max-h-full ">
        {/* Author and title */}
        <div className=" w-1/3 flex gap-x-2  items-center">
          <div className="w-[60px] h-[60px]  relative rounded-md shadow-md  overflow-hidden  ">
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

        <div className=" flex space-x-6  transition-all duration-300 justify-center items-center mr-4 ">
          <button
            className=" active:scale-110  cursor-pointer  text-neutral-400 hover:text-white"
            onClick={onPlayPrev}
            title="previous"
          >
            <IoPlaySkipBack size={28} />
          </button>
          <button
            onClick={handlePlay}
            className="p-3 active:bg-white/10 hover:bg-white/10 rounded-full cursor-pointer  text-neutral-400 hover:text-white transition-all duration-300 "
          >
            {!playing ? <IoPlay size={35} /> : <IoPause size={35} />}
          </button>
          <button
            className="active:scale-110 mr-4 cursor-pointer  text-neutral-400 hover:text-white"
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
        <div className="flex flex-1 items-center justify-end space-x-4 mx-auto ">
          <LikedButton songId={song?.id} className="scale-95 mt-0.5" />
          <VolumeIcon
            size={24}
            onClick={toggleMute}
            className="cursor-pointer text-neutral-300"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContentDesktop;
