"use client";
import { useRouter } from "next/navigation";
import { Song } from "../../../../types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import LikedItem from "./LikedItem";
import useOnPlay from "@/hooks/useOnPlay";
import { motion } from "framer-motion";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="w-full text-center mt-[50%] font-semibold text-neutral-400 text-3xl h-auto overflow-y-auto">
        No Favourites.
      </div>
    );
  } else {
    return (
      <div className="overflow-y-auto px-5 py-2 pb-50 ">
        {songs.map((song,idx) => (
          <motion.div
            initial={{
              filter: "blur(10px)",
              opacity: 0,
              y: -60,
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: idx * 0.2,
              ease: "easeInOut",
            }}
            key={idx}
          >
            <LikedItem
              onclick={(id: string) => onPlay(id)}
              song={song}
            />
          </motion.div>
        ))}
      </div>
    );
  }
};

export default LikedContent;
