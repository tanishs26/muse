import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbLibrary, TbMusic, TbPlaylist } from "react-icons/tb";

const Library = () => {
  const onClick = () => {};
  return (
    <div className="flex flex-col mt-4 ">
        <div className="inline-flex items-center gap-x-3 text-md cursor-pointer transition text-orange-600  hover:text-white">
          <p>Create new playlist</p>
          <AiOutlinePlus onClick={onClick} className="cursor-pointer   focus:rounded-4xl hover:scale-140"/>
        </div>
      
    </div>
  );
};

export default Library;
