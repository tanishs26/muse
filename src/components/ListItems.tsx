"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";

interface ListItemsProps {
  image: string;
  name: string;
  href: string;
}
const ListItems: React.FC<ListItemsProps> = ({ name, image, href }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };
  return (
    <button className="relative  gap-x-4 group flex items-center rounded-md overflow-hidden bg-neutral-100/10 hover:bg-neutral-100/20 transition cursor-pointer" onClick={onClick}>
      <div className="relative min-w-[64px] min-h-[64px]">
        <Image className="object-cover" fill src={image} alt="image" />
      </div>
      <p className="font-bold truncate p-4  ">{name}</p>
      <div className="group absolute transition opacity-0 rounded-full items-center justify-center bg-orange-500 p-4  drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay  className="text-white pl-1 group-hover:scale-120 "/>
      </div>
    </button>
  );
};

export default ListItems;
