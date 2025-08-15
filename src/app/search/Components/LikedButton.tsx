"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { button } from "framer-motion/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { AiFillHeart, AiFillLike, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";

interface LikedButtonProps {
  songId: string;
}

const LikedButton: React.FC<LikedButtonProps> = ({ songId }) => {
  const router = useRouter();
  const {supabaseClient}  = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", songId)
        .eq("user_id", user?.id)
        .single();
        console.log("Liked songs:",data);
      if (!error && data) {
        setIsLiked(true);
      }
      
    };
    fetchData();
    
  }, [user?.id, songId, isLiked]);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  const handleClick = async () => {
    if (!user) {
      authModal.onOpen()
      return;
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);
      if (error) {
        toast(error.message);
      }
      setIsLiked(false);
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user?.id });
      if (error) {
        toast(error.message);
      }
      toast.success("Added to Favourites")
      setIsLiked(true);
    }
    
    router.refresh()
  };

  return (
    <button onClick={handleClick}>
      <Icon
        size={28}
        color={isLiked ? "#FF0000" : "white"}
        className="hover:opacity-80 cursor-pointer"
      />
    </button>
  );
};

export default LikedButton;
