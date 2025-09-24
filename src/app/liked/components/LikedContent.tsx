"use client";
import { useRouter } from "next/navigation";
import { Song } from "../../../../types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import LikedItem from "./LikedItem";
import useOnPlay from "@/hooks/useOnPlay";
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
      <div className="overflow-y-auto px-5 py-2 mb-10 ">
        {songs.map((song) => (
          <LikedItem
            onclick={(id: string) => onPlay(id)}
            key={song.id}
            song={song}
          />
        ))}
      </div>
    );
  }
};

export default LikedContent;
