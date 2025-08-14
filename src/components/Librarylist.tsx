import useLoadImage from "@/hooks/useLoadImage";
import React from "react";
import Image from "next/image";
interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}
interface LibrarylistProps {
  item: Song;
  onClick: (id: string) => void;
  className: any;
}

const Librarylist: React.FC<LibrarylistProps> = ({
  item,
  onClick,
  className,
}) => {
  const imagePath = useLoadImage(item);
  const handleClick = () => {
    if (onClick) {
      return onClick(item.id);
    }
    //TODO:Default turn on player
  };
  return (
    <div className={`hover:bg-neutral-400/10 w-full h-full flex gap-x-5 rounded-md  p-4  cursor-pointer  items-center` }>
      <div>
        <Image
          className="object-fit  rounded-lg"
          width="50"
          height="0"
          src={imagePath || "/liked.png"}
          alt="No Image"
        />
      </div>
      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm text-neutral-400">{item.author}</p>
      </div>
    </div>
  );
};

export default Librarylist;
