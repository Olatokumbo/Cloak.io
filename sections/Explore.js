import ExploreTile from "../components/ExploreTile";
const Explore = () => {
  return (
    <div className="w-full mt-28">
      <h1 className="text-3xl font-bold text-gray-800">Explore</h1>
      <div className="my-4 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full">
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
        <ExploreTile src="/design.svg" title="Graphics and Design" />
      </div>
    </div>
  );
};

export default Explore;
