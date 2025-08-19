"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiHistory, BiSearch } from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active:
          pathname !== "/search" &&
          pathname !== "/playlist" &&
          pathname !== "/liked"&&
          pathname!=='/history',
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname !== "/" && pathname !== "/liked"&&pathname !== "/playlist"&&pathname!=='/history',
        href: "/search",
      },
      {
        icon: BiHistory,
        label: "History",
        active: pathname !== "/" && pathname !== "/liked"&&pathname !== "/search" ,
        href: "/history",
      },
    ],
    [pathname]
  );
  return (
    <div>
      <div className="hidden md:flex flex-col gap-y-2  h-full w-[300px] p-2">
        <Box className="overflow-y-auto h-full py-2">
          <div className="flex flex-col gap-y-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
          <Library songs={songs} />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
