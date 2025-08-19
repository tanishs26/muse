import getSongsByHistory from "@/actions/getSongsById";

const History = async () => {
  const songs = await getSongsByHistory();

  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
};

export default History;
