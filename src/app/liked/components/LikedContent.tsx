"use client";
import { useRouter } from "next/navigation";
import { Song } from "../../../../types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import LikedItem from "./LikedItem";
interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="text-center mt-[50%] font-semibold text-neutral-400 text-3xl">
        No Favourites.
      </div>
    );
  } else {
    return (
      <div className="w-full h-full overflow-y-auto">
        {songs.map((song) => (
          <LikedItem key={song.id} song={song} />
        ))}

      </div>
    );
  }
};

export default LikedContent;
