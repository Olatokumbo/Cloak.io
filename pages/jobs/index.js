import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import JobCard from "../../components/JobCard";
import Layout from "../../components/Layout";
import { SearchIcon, ChevronDownIcon } from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";

const Jobs = () => {
  const [searchResults, setSearchResults] = useState([]);
  const keywordRef = useRef();
  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY
  );
  var index = client.initIndex("jobs");
  const jobSearch = async (e) => {
    e.preventDefault();
    console.log("Searching...");
    await index
      .search(keywordRef.current.value)
      .then((responses) => {
        console.log(responses);
        setSearchResults(responses.hits);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gray-800 py-12 px-4">
          <h3 className="text-white text-3xl font-medium">Find Jobs</h3>
        </div>
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
                    <ChevronDownIcon className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" />
                    <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                      <option defaultValue>
                        Choose Location &nbsp; &nbsp;
                      </option>
                      <option>Lagos</option>
                      <option>Kaduna</option>
                      <option>Abuja</option>
                      <option>Gbagada</option>
                    </select>
                  </div>
                  {/* Job type Dropdown menu */}
                  <div className="relative inline-flex m-1">
                    <ChevronDownIcon className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" />
                    <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                      <option defaultValue>
                        Choose Job Type &nbsp; &nbsp;
                      </option>
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
                <form className="my-4 flex" onSubmit={jobSearch}>
                  <input
                    className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-800"
                    placeholder="Search for jobs"
                    ref={keywordRef}
                  />
                  <button className="px-5 rounded-r-lg bg-gray-700  text-gray-800 font-bold p-2 uppercase border-gray-800 border-t border-b border-r focus:outline-none">
                    <SearchIcon className="h-6 w-6 text-white" />
                  </button>
                </form>
                <div className="flex justify-between mb-2 items-center">
                  <h4 className="font-semibold text-2xl">
                    {keywordRef.current?.value &&
                      `Results for "${keywordRef.current?.value}"`}
                  </h4>
                  {/* Location Dropdown menu */}
                  <div className="relative inline-flex my-1">
                    <ChevronDownIcon className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" />
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
                    {searchResults.map((job) => (
                      <Link  href={`/jobs/${job.objectID}`} key={job.objectID}>
                        <a target="_blank">
                          <JobCard data={job} />
                        </a>
                      </Link>
                    ))}
                  </div>
                  {/* <button className="mx-auto focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-gray-800 border-solid border-4 rounded-md hover:bg-gray-200">
                    Load More
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex-1"></div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
