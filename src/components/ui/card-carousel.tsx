"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "../../../types";

interface CarouselProps {
  images: {
    src: string;
    alt: string;
    songPath: string;
    id: string;
  }[];

  songs: Song[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2500,
  showNavigation = false,
  songs,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  const onPlay = useOnPlay(songs);
  return (
    <section className="z-5 w-full">
      <style>{css}</style>
      <div className="mx-auto mask-l-from-80% mask-r-from-80%  w-full max-w-5xl rounded-[24px]  p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border  bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2 border-black ">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
              className="-z-10"
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button
                      className="size-full"
                      onClick={() => {
                        onPlay(image.id);
                      }}
                    >
                      <div className="size-full rounded-3xl">
                        <Image
                          src={image.src}
                          width={200}
                          height={200}
                          className="size-full rounded-xl"
                          alt={image.alt}
                        />
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button
                      className="size-full"
                      onClick={() => {
                        onPlay(image.id);
                      }}
                    >
                      <div className="size-full rounded-3xl">
                        <Image
                          src={image.src}
                          width={200}
                          height={200}
                          className="size-full rounded-xl"
                          alt={image.alt}
                        />
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
