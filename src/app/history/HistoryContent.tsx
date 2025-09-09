"use client";
import React from "react";
import SongItem from "../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "../../../types";

interface PageContentProps {
  songs: Song[];
}
const History: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length == 0) {
    return (
      <h1 className="mt-50 font-semibold  text-center text-2xl text-neutral-400">
        No recently played songs
      </h1>
    );
  } else {
    return (
      <div
        className="grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-10
    p-6 "
      >
        {songs.map((item: Song) => (
          <SongItem
            key={item.id}
            onClick={(id: string) => {
              onPlay(id);
              console.log("clicked id:", id);
            }}
            data={item}
          />
        ))}
      </div>
    );
  }
};

export default History;
