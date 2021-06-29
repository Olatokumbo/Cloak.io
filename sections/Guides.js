import InfoCard from "../components/InfoCard";
const Guides = () => {
  return (
    <div className="relative p-2 my-2">
      <div className="w-full h-full bg-gray-800 opacity-60 absolute left-0 right-0 top-0 bottom-0 rounded-md"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-100 text-center">
          Coming Soon...
        </h1>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 -z-1">Guide</h1>
      <div className="py-7 mb-5 w-full grid gap-x-3 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center -z-1">
        <InfoCard
          title="Advertise your Professional Skills"
          subtitle="Know the basic steps on how to showcase your skills here"
          url="/advertise.jpg"
        />
        <InfoCard
          title="Learning about Internet-Based Jobs"
          subtitle="Know how this types of jobs are changing the way one can easily earn"
          url="/internet-jobs.jpg"
        />
        <InfoCard
          title="Knowing the right worth of services"
          subtitle="Having the knowledge on how much various services are worth is key"
          url="/services.jpg"
        />
      </div>
    </div>
  );
};

export default Guides;
