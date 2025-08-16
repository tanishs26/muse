"use client";
import useGetSongsByID from "@/hooks/useGetSongsByID";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import React, { useState } from "react";
import PlayerContent from "./PlayerContent";
import PlayerContentDesktop from "./PlayerContentDesktop";
import PlayerContentMobile from "./PlayerContentMobile";
import { motion, AnimatePresence } from "framer-motion";
const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongsByID(player?.activeId);
  const songUrl = useLoadSong(song!);
  const [fullScreen, setFullScreen] = useState(false);


  if (!song || !player?.activeId || !songUrl) {
    return null;
  }
  return (
    <div>
      <AnimatePresence>
        {fullScreen ? (
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 1, scale: 0.8 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.3 },
            }}
            className="fixed inset-0 z-50"
          >
            <PlayerContentMobile
              song={song!}
              songPath={songUrl!}
              onClose={() => setFullScreen(false)}
            />
          </motion.div>
        ) : (
          <PlayerContent
            onOpen={() => setFullScreen(true)}
            key={songUrl!}
            song={song!}
            songPath={songUrl!}
          />
        )}
      </AnimatePresence>
      <div className="md:fixed bottom-0  bg-[#1d202b] md:h-[80px] w-full">
        <PlayerContentDesktop song={song!} songPath={songUrl!} key={songUrl!} />
      </div>
    </div>
  );
};

export default Player;
