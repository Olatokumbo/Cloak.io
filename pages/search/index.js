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
        <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <ProfileCard />
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
