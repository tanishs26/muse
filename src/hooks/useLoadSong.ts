
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../../types";


const useLoadSong = (song:Song) => {
    const supabase=useSupabaseClient()  
    if (!song) {
    return null;
  } //done
    const {data}=supabase.storage
    .from('songs')
    .getPublicUrl(song?.song_path)
    return data.publicUrl;
   
}
export default useLoadSong;
