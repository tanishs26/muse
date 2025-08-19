
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (data as Song[]) || [];
};

export default getSongs