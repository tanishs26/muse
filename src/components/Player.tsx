"use client";
import useGetSongsByID from "@/hooks/useGetSongsByID";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongsByID(player?.activeId);
  const songUrl = useLoadSong(song!);
//   console.log(songPath);
  
  if (!song || !player?.activeId || !songUrl) {
    return null;
  }
  return (
    <div className=" flex items-center absolute bottom-18 md:fixed md:bottom-0 bg-[#1d202b] py-2 h-[60px] rounded-md md:rounded-none md:h-[80px] md:w-full  left-[50%] transform -translate-x-1/2 w-[90%]">
        <PlayerContent 
         key={songUrl!}
         song={song!}
         songPath={songUrl!}/>
    </div>
  );
};

export default Player;
