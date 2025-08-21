import React from "react";
import { Song } from "../../../../types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import LikedButton from "@/app/search/Components/LikedButton";
interface LikedItemProps {
  song: Song;
}

const LikedItem: React.FC<LikedItemProps> = ({ song }) => {
    
  const imagePath = useLoadImage(song);
  return (
    <div className="w-full rounded-lg flex items-center justify-between m-4 p-2 hover:bg-neutral-900 active:bg-neutral-900 mr-9  ">
      <div className="flex items-center">
        <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden mr-4">
          <Image src={imagePath||'/liked.png'} fill alt="no img" className="object-cover" />
        </div>
        <div>
          <h1 className="font-semibold text-white">{song?.title}</h1>
          <p className="text-sm text-neutral-400">{song?.author}</p>
        </div>
      </div>

      <LikedButton songId={song?.id} />
    </div>
  );
};

export default LikedItem;
