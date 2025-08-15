"use client";
export const revalidate=0

import Librarylist from "@/components/Librarylist";
import { Song } from "../../../../types";
import LikedButton from "./LikedButton";

interface SearchContentProps {
  songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="text-2xl text-center mt-50 text-neutral-400 font-semibold ">
        No Song Found!
      </div>
    );
  } else {
    return (
      <div>
        <div className=" flex flex-col gap-y-2 w-full  px-6">
          {songs.map((song) => (
            <div key={song.id} className="flex group items-center ">
              <div className="flex-1 ">
                <Librarylist item={song} className="" onClick={() => {}} />
              </div>

              <LikedButton songId={song.id} />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    );
  }
};

export default SearchContent;
