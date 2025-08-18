"use client";
import React from "react";
import SongItem from "../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "../../../types";
import { useUser } from "@/hooks/useUser";
import getSongs from "@/actions/getSongs";
interface PageContentProps {
  songs: Song[];
}
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  const user = useUser();
  if (songs.length == 0) {
    return (
      <h1 className="mt-50 font-semibold  text-center text-2xl text-neutral-400">
        Oops! No songs available
      </h1>
    );
  } else {
    return (
      <div
        className="grid
    grid-cols-3
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-10"
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

export default PageContent;
