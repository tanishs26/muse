import React, { useState, useEffect } from "react";
import { Song } from "../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";
import LikedButton from "@/app/search/Components/LikedButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
interface PlayerContentProps {
  song: Song;
  songPath: string;
  onOpen:()=>void;
}
const PlayerContent = ({ song, songPath,onOpen }: PlayerContentProps) => {
  const imagePath = useLoadImage(song);
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
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
        console.log("Mobile yooo");

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
   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cumque incidunt laborum ipsum ea! A sapiente sequi facere! Officia inventore quae provident cum neque. Neque eaque repudiandae beatae saepe laborum.</div>
  );
};

export default PlayerContent;