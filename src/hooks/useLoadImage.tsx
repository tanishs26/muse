import { useSupabaseClient } from "@supabase/auth-helpers-react";
interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}
const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient();
  if (!song) {
    return null;
  }

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);
  return data.publicUrl;
};
export default useLoadImage;
