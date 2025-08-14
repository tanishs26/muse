import getLikedSong from "@/actions/getLikedSong";

import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;
const Liked = async () => {
  const songs = await getLikedSong();
  console.log("liked songs:", songs);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto">
      <header>
        <div className="flex flex-col md:flex-row items-center gap-x-5 border-b-1 justify-center lg:justify-start gap-y-5  text-gray-800 pb-4 ">
          <div className="relative w-32 h-32 lg:h-44 lg:w-44">
            <Image fill src="/liked.png" alt="Nope" className="rounded-lg ml-2" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl ml-5 font-semibold text-neutral-300">
            Favourites
          </h1>
        </div>
      </header>
      <LikedContent songs={songs}/>
    </div>
  );
};
export default Liked;
