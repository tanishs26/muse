"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";

interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      className="bg-neutral-400/10
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        hover:bg-neutral-400/20
        cursor-pointer
        transition
        p-3"
      onClick={() => onClick(data.id)}
    >
      <div className="relative aspect-square rounded-md overflow-hidden w-full h-full">
        <Image
          className="object-cover "
          src={imagePath || "liked.png"}
          fill
          alt="no image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-2">
        <p className="font-semibold truncate w-full">{data.title} </p>
        <p className="text-sm text-neutral-400 pb-4 w-full truncate">By {data.author}</p>
      </div>
      <div className="absolute bottom-25 right-5"><PlayButton/></div>
    </div>
  );
};

export default SongItem;
