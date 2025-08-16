import { Song } from "../../types";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const player = usePlayer();
  const onPlay = (id: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
