import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "../../types";

const getSongsByHistory = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    return [];
  }
  
  const { data, error } = await supabase.rpc("distinct_song_ids", {
    uid: user.id,
  });

  if (error) {
    console.log("Get songs by id :", error.message);
  }
  const ids = data.map((id: { song_id: number }) => id.song_id);
  const { data: allSongs, error: Songerror } = await supabase
    .from("songs")
    .select("*")
    .in("id", ids);
  return (allSongs as Song[]) || [];
};
export default getSongsByHistory;
