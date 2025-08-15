
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../../types";


const useLoadSong = (song:Song) => {
    const {supabaseClient}=useSessionContext()   
    const {data}=supabaseClient.storage.from('songs').getPublicUrl(song?.song_path)
    return data.publicUrl;
   
}
export default useLoadSong;
