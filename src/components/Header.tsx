"use client";
import React from "react";
import { PlaceholdersAndVanishInputDemo } from "@/components/HeadInput";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { div } from "framer-motion/client";
import { FaUser } from "react-icons/fa";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="46" viewBox="0 0 32 32" width="46">
      <path
        clipRule="evenodd"
        d="M30.6482 10.1305L15.8785 7.02583L7.02923 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Header = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO: Reset any playing songs while logging out;
    router.replace(window.location.pathname);
    router.refresh();
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full  flex justify-between h-18 items-center ">
      <div className=" flex justify-center">
        <div className="ml-4 flex justify-center items-center">
          <AcmeLogo />
          <p className="sm:block font-extrabold text-3xl">MUSE</p>
        </div>
      </div>
      <div className="lg:flex mdflex hidden gap-3">
        <PlaceholdersAndVanishInputDemo />
      </div>
      {user ? (
        <div className="flex justify-center items-center mr-7">
          <Button
            className="mr-2 text-black font-bold bg-white antialiased  "
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button className="bg-orange-600 text-white/50 border-0  p-3 rounded-full" onClick={()=>router.push('/account')}>
            <FaUser />
          </Button>
        </div>
      ) : (
        <div>
          <Button className="  border-none mr-2  " onClick={authModal.onOpen}>
            Sign up
          </Button>
          <Button className="mr-3  antialiased " onClick={authModal.onOpen}>
            Log in
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
