"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { PlaceholdersAndVanishInputDemo } from "@/components/Input";
import Button from "./Button";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="46" viewBox="0 0 32 32" width="46">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Header = () => {
  return (
    <div className="w-full flex justify-between h-18 items-center ">
      <div className=" flex justify-center">
        <div className="ml-4 flex justify-center items-center">
          <AcmeLogo />
          <p className="sm:block font-extrabold text-3xl">MUSE</p>
        </div>
      </div>
      <div className="lg:flex mdflex hidden gap-3">
        <PlaceholdersAndVanishInputDemo  />
      </div>
      <div>
        <Button className=" texy-neutral-500 border-none mr-2">Sign up</Button>
        <Button className="mr-3 texy-neutral-500 ">Log in</Button>
      </div>
    </div>
  );
};

export default Header;
