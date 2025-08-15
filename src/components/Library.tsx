import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { ListMusic } from "lucide-react";
import React from "react";
import Librarylist from "./Librarylist";
import { AiOutlinePlus } from "react-icons/ai";
interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    } else {
      uploadModal.onOpen();
    }
  };
  return (
    <div className="  group  flex flex-col ">
      <div className="p-4 inline-flex items-center gap-x-3 text-md font-semibold cursor-pointer transition   group-hover:text-white">
        <p>Create new playlist</p>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="cursor-pointer font-semibold hover:scale-120  active:scale-120 "
        />
      </div>
      <div
        className="flex gap-x-2 items-center text-neutral-400 font-semibold
          p-4
          pt-0
          text-md "
      >
        <p>
          <ListMusic />
        </p>
        <p> Personals</p>{" "}
      </div>
      <div className="max-w-full ">
        {songs.map((item) => (
          <Librarylist className="hover:bg-amber-50/10" key={item.id} item={item} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Library;
