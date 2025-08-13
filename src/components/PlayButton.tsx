import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center p-4 cursor-pointer  drop-shadow-md translate translate-y-1/4  active:scale-100 bg-orange-500 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay />
    </button>
  );
};

export default PlayButton;
