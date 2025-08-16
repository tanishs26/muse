"use client";
import useGetSongsByID from "@/hooks/useGetSongsByID";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import React, { useEffect, useState } from "react";
import PlayerContentDesktop from "./PlayerContentDesktop";
import PlayerContentMobile from "./PlayerContentMobile";
;
const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongsByID(player?.activeId);
  const songUrl = useLoadSong(song!);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  if (!song || !player?.activeId || !songUrl) {
    return null;
  }
  return isDesktop ? (
    <div className="md:fixed bottom-0  bg-[#1d202b] md:h-[80px] w-full">
      <PlayerContentDesktop song={song!} songPath={songUrl!} key={songUrl!} />
    </div>
  ) : (
    <>
      <PlayerContentMobile song={song!} songPath={songUrl!} key={songUrl} />
    </>
  );
};

export default Player;
