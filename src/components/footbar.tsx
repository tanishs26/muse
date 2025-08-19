"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { HiHome } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import { ListMusic } from "lucide-react";
import { button } from "@heroui/theme";
import FootbarItems from "./FootbarItems";
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
      icon: ListMusic,
      label: "playlist",
      active: pathname === "/history",
      href: "/playlist",
    },
  ];

  return (
    <div className="md:hidden flex justify-evenly items-center absolute bottom-1  left-1/2 transform -translate-x-1/2 text-center  text-white text-2xl w-[90%] overflow-hidden rounded-full gap-6  px-2 py-2 bg-white/10 backdrop-blur-xl">
      {routes.map((item) => {
        return <FootbarItems key={item.href} {...item} />;
      })}
    </div>
  );
};

export default Footbar;
