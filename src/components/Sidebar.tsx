"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
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
          <Library/>
        </Box>
       
      </div>
    </div>
  );
};

export default Sidebar;
