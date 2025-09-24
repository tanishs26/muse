"use client";
import React from "react";
import SongItem from "../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "../../../types";
import {motion} from 'framer-motion'
interface PageContentProps {
  songs: Song[];
}
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

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
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-4
    my-10 pb-10"
      >
        {songs.map((item: Song,idx) => (
          <motion.div
          initial={{
            filter:"blur(10px)"
            ,opacity:0,
            y:-60
          }}
          animate={{
            filter:"blur(0px)"
            ,opacity:1,
            y:0
          }}
          transition={{
            delay:idx*0.2,
            ease:"easeInOut",
            
          }}
                      key={item.id}

          >
            <SongItem
            onClick={(id: string) => {
              onPlay(id);
              console.log("clicked id:", id);
            }}
            data={item}
          />
          </motion.div>
        ))}
      </div>
    );
  }
};

export default PageContent;
