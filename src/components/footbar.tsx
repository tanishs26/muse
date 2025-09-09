"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { HiHome } from "react-icons/hi2";
import { BiHistory, BiSearch } from "react-icons/bi";
import { ListMusic } from "lucide-react";
import Link from "next/link";
import {motion} from "framer-motion"

const Footbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      icon: HiHome,
      label: "Home",
      active:
        pathname !== "/search" &&
        pathname !== "/playlist" &&
        pathname !== "/liked" &&
        pathname !== "/history",
      href: "/",
    },
    {
      icon: BiSearch,
      label: "Search",
      active: pathname === "/search",
      href: "/search",
    },
    {
      icon: ListMusic,
      label: "playlist",
      active: pathname === "/playlist",
      href: "/playlist",
    },
    {
      icon: BiHistory,
      label: "playlist",
      active: pathname === "/history",
      href: "/history",
    },
  ];
  return (
    <div className="md:hidden flex justify-evenly items-center absolute bottom-1  left-1/2 transform -translate-x-1/2 text-center  text-white text-2xl w-[90%] overflow-hidden rounded-full gap-6  px-2 py-2 bg-white/10 backdrop-blur-xl">
      {routes.map((item,idx) => {
        const Icon=item.icon
        return(
          <div key={idx}>

          <Link href={item.href} className={` flex justify-center items-center rouded-full w-[50px] h-[50px] relative `} >
            
          {item.active &&<motion.span 
          layoutId="hover" className="absolute inset-0 bg-orange-600 rounded-full "></motion.span>}
          <Icon size={26} className='text-white relative' />

      </Link>
      </div>
        )
      })}
    </div>
  );
};

export default Footbar;
