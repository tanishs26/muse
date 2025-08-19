import getSongsByHistory from "@/actions/getSongsById";
import HistoryContent from "./HistoryContent";

const History = async () => {
  const songs = await getSongsByHistory();

  return (
    <div className="w-full">
       <HistoryContent songs={songs}/>
      
    </div>
  );
};

export default History;
