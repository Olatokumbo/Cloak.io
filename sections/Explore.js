import ExploreTile from "../components/ExploreTile";
const Explore = () => {
  return (
    <div className="w-full mt-28">
      <h1 className="text-4xl font-bold text-gray-800">Explore</h1>
      <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
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
