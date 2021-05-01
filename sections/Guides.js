import InfoCard from "../components/InfoCard";
const Guides = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Guide</h1>
      <div className="py-7 mb-5 w-full grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
};

export default Guides