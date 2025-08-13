import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { ListMusic } from "lucide-react";
import React from "react";
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
    <div className="  group  flex flex-col mt-4 ">
      <div className=" inline-flex items-center gap-x-3 text-md font-semibold cursor-pointer transition text-orange-600  group-hover:text-white">
        <p>Create new playlist</p>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="cursor-pointer   active:scale-120 "
        />
      </div>
      <div
        className="flex gap-x-2 items-center text-neutral-400 font-semibold
          mt-4
          text-md "
      >
        <p>
          <ListMusic />
        </p>
        Personals
      </div>
      <div>
        {songs.map(item=>(
          <div>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Library;
