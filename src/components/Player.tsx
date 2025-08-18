"use client";
import useGetSongsByID from "@/hooks/useGetSongsByID";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import React, { useEffect, useState } from "react";
import PlayerContentDesktop from "./PlayerContentDesktop";
import PlayerContentMobile from "./PlayerContentMobile";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
const Player = () => {
  const player = usePlayer();
  const {user} =useUser()
  const { song } = useGetSongsByID(player?.activeId);
  const songUrl = useLoadSong(song!);
  const [isDesktop, setIsDesktop] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const onClose = () => setFullScreen(false);
  const onOpen = () => setFullScreen(true);

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
    <div className="md:fixed bottom-0 md:h-[80px] w-full">
      <PlayerContentDesktop song={song!} songPath={songUrl!} key={songUrl!} />
    </div>
  ) : (
    <>
      <PlayerContentMobile
        onClose={onClose}
        onOpen={onOpen}
        fullScreen={fullScreen}
        song={song!}
        songPath={songUrl!}
        key={songUrl}
      />
    </>
  );
};

export default Player;
