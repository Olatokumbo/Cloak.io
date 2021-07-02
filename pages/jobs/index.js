import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "../../components/JobCard";
import Layout from "../../components/Layout";
import { SearchIcon, ChevronDownIcon } from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
// import { fetchJobs } from "../../redux/actions/jobs";
import useLocation from "../../hooks/useLocation";
import { errorNotification } from "../../utils/notifications";

const Jobs = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState("");
  const [keyword, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = useLocation();
  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY
  );
  var index = client.initIndex("jobs");
  useEffect(() => {
    setLoading(true);
    const jobSearch = async () => {
      await index
        .search(keyword, location && { filters: `location:${location}` })
        .then((responses) => {
          setLoading(false);
          setSearchResults(responses.hits);
        })
        .catch((e) => {
          setLoading(false);
          errorNotification("Failed", e.message);
        });
    };
    jobSearch();
  }, [keyword, location]);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gray-800 py-12 px-4">
          <h3 className="text-white text-3xl font-medium">Jobs</h3>
        </div>
        <div className="flex min-h-screen">
          <div className="flex-3 p-3 flex-col">
            <div className="flex items-start flex-col-reverse md:flex-row">
              <div className="py-1 pr-0  w-full md:w-min md:py-6 md:pr-5 flex flex-col">
                <h5 className="text-sm font-semibold text-gray-600">
                  Filter by:
                </h5>
                <div className="flex flex-wrap items-center justify-center">
                  {/* Location Dropdown menu */}
                  <div className="relative inline-flex m-1">
                    <ChevronDownIcon className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" />
                    <select
                      onChange={(e) => setLocation(e.target.value)}
                      className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    >
                      <option defaultValue value="">
                        All Locations &nbsp;
                      </option>
                      {cities.map((name, i) => (
                        <option key={i} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Job type Dropdown menu */}
                  {/* <div className="relative inline-flex m-1">
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
                  </div> */}
                </div>
                {isAuth && (
                  <Link href="/job/all">
                    <button className="my-6 mx-auto bg-black text-white py-1.5 px-2.5 rounded-md hover:bg-gray-900 focus:outline-none w-full max-w-xs">
                      My Jobs
                    </button>
                  </Link>
                )}
              </div>
              <div className="flex flex-col flex-1 w-full">
                <div className="my-4 flex">
                  <input
                    className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-800"
                    placeholder="Search for jobs"
                    value={keyword}
                    onChange={(e) => setKeyWord(e.target.value)}
                  />
                  <button className="px-5 rounded-r-lg bg-gray-700  text-gray-800 font-bold p-2 uppercase border-gray-800 border-t border-b border-r focus:outline-none">
                    <SearchIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex justify-between mb-2 items-center">
                  <h4 className="font-semibold text-2xl">
                    {keyword && `Results for "${keyword}"`}
                  </h4>
                </div>
                <div>
                  <div>
                    {searchResults.length > 0 ? (
                      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        {searchResults.map((job) => (
                          <Link
                            href={`/jobs/${job.objectID}`}
                            key={job.objectID}
                          >
                            <a /*target="_blank"*/>
                              <JobCard data={job} />
                            </a>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h1 className="mx-auto my-5 text-2xl">Job(s) Not Found</h1>
                        {loading && <CircularProgress />}
                      </div>
                    )}
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

// export const getStaticProps = async () => {
//   const res = await fetchJobs();
//   const jobs = JSON.parse(res);
//   return {
//     props: {
//       jobs,
//     },
//     revalidate: 1,
//   };
// };
