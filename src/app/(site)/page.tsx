import React from "react";
import ListItems from "@/components/ListItems";
import getSongs from "@/actions/getSongs";
import PageContent from "@/app/(site)/PageContent";
import CarouseL from "./CarouseL";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Position from "@/components/Position";

export const revalidate = 0;
const Page = async () => {
  const songs = await getSongs();
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ")[0]
    : "there";

  return (
    <div className="p-7 w-full h-full bg-black/50 mb-10 no-scrollbar">
      <h1 className="text-[28px] tracking-tight sm:text-5xl font-semibold  mb-5 md:mb-10 text-shadow-md text-neutral-20 gap-2 flex items-center ">
        Hey {firstName} !
        <Position/>
      </h1>
      <div
        className=" grid 
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-3
      mt-4 "
      >
        <ListItems image="/liked.png" name={"Favourites"} href="/liked" />
      </div>

      <div className="mt-10 mb-7 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl text-white">
            Recently Featured
          </h1>
        </div>
        <div className="w-full">
          <CarouseL songs={songs} />
        </div>
        <h1 className="font-semibold text-2xl text-white">All Songs</h1>
        <div className="mb-10">
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default Page;
