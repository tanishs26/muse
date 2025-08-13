
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
const getSongsbyUser = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies});
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    return [];
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getSongsbyUser;
