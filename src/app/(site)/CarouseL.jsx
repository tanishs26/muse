"use client";
import { CardCarousel } from "@/components/ui/card-carousel";

import useLoadImage from "@/hooks/useLoadImage";
import React from "react";
import useLoadSong from "@/hooks/useLoadSong";

const CarouseL = ({ songs }) => {
  const images = songs.map((song) => {
    const image_path = useLoadImage(song) ;
    const song_path = useLoadSong(song) ;
    return {
      src: image_path,
      songPath: song_path,
      alt: song.title,
      id: song.id,
    };
  });

  return <CardCarousel images={images} songs={songs} />;
};

export default CarouseL;
