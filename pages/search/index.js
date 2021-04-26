import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
const Search = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div>
        <div className="p-5">
          <h1 className="text-3xl font-semibold">Results for "Web Developer"</h1>
        </div>
        <div className="w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Search;
