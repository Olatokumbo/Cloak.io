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
        <div className="flex-3 p-5 flex-col">
          <div className="flex items-start flex-col-reverse md:flex-row">
            <div className="py-1 pr-0  w-full md:w-min md:py-6 md:pr-5">
              <h5 className="text-sm font-semibold text-gray-600">
                Filter by:
              </h5>
              <div className="flex flex-wrap items-center justify-center">
                {/* Location Dropdown menu */}
                <div className="relative inline-flex m-1">
                  <svg
                    className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>
                  <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option defaultValue>Choose Location &nbsp; &nbsp;</option>
                    <option>Lagos</option>
                    <option>Kaduna</option>
                    <option>Abuja</option>
                    <option>Gbagada</option>
                  </select>
                </div>
                {/* Job type Dropdown menu */}
                <div className="relative inline-flex m-1">
                  <svg
                    className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>
                  <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option defaultValue>Choose Job Type &nbsp; &nbsp;</option>
                    <option>Freelance</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full">
              <form className="my-4 flex">
                <input
                  className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-800"
                  placeholder="Search for jobs"
                />
                <button className="px-5 rounded-r-lg bg-gray-700  text-gray-800 font-bold p-2 uppercase border-gray-800 border-t border-b border-r focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
              <div className="flex justify-between mb-2 items-center">
                <h4 className="font-semibold text-2xl">Book Editing Jobs</h4>
                {/* Location Dropdown menu */}
                <div className="relative inline-flex my-1">
                  <svg
                    className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>
                  <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option defaultValue>Date Posted</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Yellow</option>
                    <option>Black</option>
                    <option>Orange</option>
                    <option>Purple</option>
                    <option>Gray</option>
                    <option>White</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                </div>
                <button className="mx-auto focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-gray-800 border-solid border-4 rounded-md hover:bg-gray-200">
              Load More
            </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex-1"></div> */}
      </div>
    </div>
  );
};

export default Jobs;
