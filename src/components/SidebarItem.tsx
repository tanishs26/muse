import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tw-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
          relative
          flex items-center justify-between gap-x-3 text-md px-4 py-3
          text-md font-medium cursor-pointer
          transition hover:text-white
          ${active ? "text-white" : "text-neutral-400"}
        `
      )}
    >
      {active && (
        <span
          className="
            absolute left-0 top-1 bottom-1 w-full
            border-l-4
            border-orange-500
            bg-gradient-to-r from-orange-600/20 to-transparent
            shadow-lg
            text-white
          "
        />
      )}
      <Icon size={24} className="relative  " />
      <p className="truncate w-full relative ">{label}</p>
    </Link>
  );
};

export default SidebarItem;
