import getSongsByHistory from "@/actions/getSongsById";

const History = async () => {
  const songs = await getSongsByHistory();

  return (
    <div>
      {songs.map((song) => (
        <div>{song.title}</div>
      ))}
      heyy
    </div>
  );
};

export default History;
