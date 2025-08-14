import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";

import SearchInput from "@/components/SearchInput";
import SearchContent from "./Components/SearchContent";
interface SearchProps {
  searchParams: {
    title: string;
  };
}
const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div
      className="
    rounded-lg
    w-full
    h-full
    overflow-hidden
    overflow-y-auto"
    >
      <header>
        <div className="mb-2 flex flex-col gap-y-6 px-9 py-4">
          <h1 className="text-white text-3xl font-semibold">Search Songs</h1>
          <SearchInput/>
        </div>
      </header>
      <SearchContent songs={songs}/>
    </div>
  );
};
export default Search;
