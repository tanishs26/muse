import React from "react";
import ListItems from "@/components/ListItems";
import getSongs from "@/actions/getSongs";
import PageContent from "@/app/(site)/PageContent";
import CarouseL from "./CarouseL";

export const revalidate = 0;
const Page = async () => {
  const songs = await getSongs();
  return (
    <div className="p-7 w-full h-full bg-black/50 mb-10">
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
