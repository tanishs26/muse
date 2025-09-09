"use client";
import React from "react";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import {  FaUser } from "react-icons/fa";
import Image from "next/image";

export const AcmeLogo = () => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="30"  height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-icon lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  );
};

const Header = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.replace(window.location.pathname);
    router.refresh();
    window.location.reload();

    if (error) {
      console.log(error);
    }
  };
  const img = user?.user_metadata.avatar_url;
  return (
    <div className="w-full bg-white/5  flex justify-between h-18 items-center ">
      <div className=" flex justify-center">
        <div className="ml-4 flex justify-center items-center ">
          <AcmeLogo  />
          <p className="ml-1 sm:block font-extrabold text-3xl">MUSE</p>
        </div>
      </div>
    
      {user ? (
        <div className="flex justify-center items-center mr-4">
          <Button
            className="mr-2 text-black font-bold bg-white antialiased  "
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button
            className="bg-orange-600 text-white/50 border-0 w-[50px] h-[50px] p-3 relative rounded-full overflow-hidden"
          >
            {img ? (
              <Image
                src={img}
                alt="User avatar"
                fill
                className="object-cover"
              />
            ) : (
              <FaUser className="text-white text-lg flex justify-center items-center ml-1 mb-0.5" />
            )}
          </Button>
        </div>
      ) : (
        <div>
          <Button className="  border-none mr-2  " onClick={authModal.onOpen}>
            Sign up
          </Button>
          <Button className="mr-3  border-orange-500 antialiased " onClick={authModal.onOpen}>
            Log in
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
