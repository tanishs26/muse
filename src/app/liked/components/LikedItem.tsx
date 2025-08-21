import React from "react";
import { Song } from "../../../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import LikedButton from "@/app/search/Components/LikedButton";
interface LikedItemProps {
  song: Song;
  onclick: (id: string) => void;
}

const LikedItem: React.FC<LikedItemProps> = ({ song, onclick }) => {
  const imagePath = useLoadImage(song);

  return (
    <div className="w-full rounded-lg flex items-center justify-between  p-2 hover:bg-neutral-900 active:bg-neutral-900  ">
      <div onClick={() => onclick(song.id)} className="flex items-center ">
        <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden mr-4">
          <Image
            src={imagePath || "/liked.png"}
            fill
            alt="no img"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="font-semibold text-white">
            {song?.title || "Title for song"}
          </h1>
          <p className="text-sm text-neutral-400">
            {song?.author || "Author Song"}
          </p>
        </div>
      </div>

      <LikedButton songId={song?.id} />
    </div>
  );
};

export default LikedItem;
