import Navbar from "../../components/Navbar";
import JobCard from "../../components/JobCard";
const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* <div className="bg-gray-800 py-12 px-4">
        <h3 className="text-white text-3xl font-medium">Find Jobs</h3>
      </div> */}
      <div className="flex min-h-screen">
        <div className="flex-1"></div>
        <div className="flex-2 p-5 flex-col">
          <div className="flex justify-between mb-2">
            <h4>Book Editing Jobs</h4>
            <h4>Sort by Newest</h4>
          </div>
          <div className="">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Jobs;
