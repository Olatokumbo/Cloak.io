import InfoCard from "../components/InfoCard";
const Guides = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Guide</h1>
      <div className="py-7 mb-5 w-full grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <InfoCard title="Advertise your Skills" subtitle="Know the basic steps on how to showcase your skills here"/>
        <InfoCard title="Learning about Internet-Based Jobs" subtitle="Know how this types of jobs are changing the way one can easily earn"/>
        <InfoCard title="Knowing the right worth of services" subtitle="Having the knowledge on how much various services are worth is very important"/>
      </div>
    </div>
  );
};

export default Guides