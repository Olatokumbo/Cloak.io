import { useState } from "react";
import Link from "next/link";
import JobCard from "../../components/JobCard";
import Layout from "../../components/Layout";
import { SearchIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { CircularProgress, Button, makeStyles } from "@material-ui/core";
// import { fetchJobs } from "../../redux/actions/jobs";
import { useRouter } from "next/router";
import useLocation from "../../hooks/useLocation";
import useJobSearch from "../../hooks/useJobSearch";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#374151",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const Jobs = () => {
  const router = useRouter();
  const {
    query: { keyword, page, city },
  } = useRouter();
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const cities = useLocation();
  const { loading, searchResults, pages, message } = useJobSearch(
    location,
    page,
    keyword,
    city
  );

  const nPage = (n) => {
    router.push({
      pathname: "/jobs",
      query: { keyword: searchTerm, page: n, city: location },
    });
  };

  const searchForm = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/jobs",
      query: { keyword: searchTerm, page: 0, city: location },
    });
  };

  const changeLocation = (e) => {
    setLocation(e.target.value);
    router.push({
      pathname: "/jobs",
      query: { keyword: searchTerm, page: 0, city: e.target.value },
    });
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gray-800 py-12 px-4">
          <h3 className="text-white text-3xl font-medium">Jobs</h3>
        </div>
        <div className="flex min-h-screen">
          <div className="flex-3 p-3 flex-col">
            <div className="flex items-start flex-col-reverse md:flex-row">
              <div className="flex flex-col flex-1 w-full">
                <div className="flex items-center flex-col sm:flex-row justify-between">
                  <form
                    className="my-4 flex flex-1 w-full sm:w-auto max-w-xl"
                    onSubmit={searchForm}
                  >
                    <input
                      className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-800"
                      placeholder="Search for jobs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-5 rounded-r-lg bg-gray-700  text-gray-800 font-bold p-2 uppercase border-gray-800 border-t border-b border-r focus:outline-none">
                      <SearchIcon className="h-6 w-6 text-white" />
                    </button>
                  </form>
                  <div>
                    {/* <h5 className="text-sm font-semibold text-gray-600">
                    Filter by:
                  </h5> */}
                    <div className="flex flex-wrap items-center justify-center ml-0 sm:ml-5">
                      {/* Location Dropdown menu */}
                      <div className="relative inline-flex m-1">
                        <ChevronDownIcon className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" />
                        <select
                          onChange={changeLocation}
                          value={city}
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
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-2 items-center">
                  <h4 className="font-semibold text-2xl">
                    {keyword && `Results for "${keyword}"`}
                  </h4>
                  <h1>Page {page}</h1>
                </div>
                <div>
                  <div>
                    {searchResults.length > 0 ? (
                      <div>
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
                        <div className="my-3">
                          {pages > 0 &&
                            [...Array(pages)].map((_e, i) => (
                              <Button
                                className={classes.btn}
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => nPage(i)}
                              >
                                {i}
                              </Button>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h1 className="mx-auto my-5 text-2xl">{message}</h1>
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
