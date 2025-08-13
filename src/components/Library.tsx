import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
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
    </div>
  );
};

export default Library;
