import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import {
  fetchJobById,
  getAllJobsId,
  applyJob,
  withdrawJob,
} from "../../redux/actions/jobs";
import Link from "next/link";
import { useState, useEffect } from "react";
const JobInfo = ({ job }) => {
  const { isAuth, uid } = useSelector((state) => state.auth);
  const [appliedState, setAppliedState] = useState(false);
  const [buffer, setBuffer] = useState(true);
  useEffect(() => {
    if (localStorage.getItem(job.id) !== null) setAppliedState(true);
    else if (job.applied.filter((a) => a === uid).length > 0)
      setAppliedState(true);
    else setAppliedState(false);
  }, [buffer]);

  const apply = () => {
    if (isAuth) {
      try {
        applyJob(job.id, uid);
        localStorage.setItem(job.id, uid);
        setBuffer((prevState) => !prevState);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Signin your Account");
    }
  };

  const withdraw = () => {
    withdrawJob(job.id, uid);
    setBuffer((prevState) => !prevState);
    console.log("remove");
    localStorage.removeItem(job.id);
    setAppliedState(false);
  };
  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
        <div className="flex-3 bg-white py-5 px-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold my-5">{job?.title}</h1>
            <h5 className="text-2xl font-semibold text-gray-800">
              {`₦${job.price}` || ""}
            </h5>
          </div>
          <div className="flex justify-between mb-7">
            <div className="flex items-center">
              <img
                src={job.authorData.photoURL}
                alt="me"
                className="w-10 max-h-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-gray-800">
                  {job.authorData.displayName}
                </h4>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <h5 className="text-xs self-end text-gray-500">
                    {job?.location}
                  </h5>
                </div>
              </div>
            </div>
            {uid !== job.userId ? (
              <div>
                {!appliedState ? (
                  <button
                    onClick={apply}
                    className="ml-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    onClick={withdraw}
                    className="ml-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900"
                  >
                    Cancel Application
                  </button>
                )}
              </div>
            ) : (
              <Link href={`/job/${job.id}/edit`}>
                <button className="ml-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
                  Edit
                </button>
              </Link>
            )}
          </div>
          <div className="mt-5">
            <h1 className="font-bold text-lg mb-3 text-gray-800">
              Description
            </h1>
            {job?.description.map((text, index) => (
              <p key={index} className="my-3 text-sm">
                {text}
              </p>
            ))}
          </div>
          {/* <div className="mt-5">
            <h1 className="font-bold text-lg mb-3 text-gray-800">
              About Us
            </h1>
            <p className="my-3 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p className="my-3 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p className="my-3 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div> */}
        </div>
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
      </div>
    </Layout>
  );
};

export default JobInfo;

export const getStaticPaths = async () => {
  const res = await getAllJobsId();
  const data = JSON.parse(res);
  const paths = data.map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const res = await fetchJobById(context.params.id);
  const data = JSON.parse(res);
  return {
    props: {
      job: data,
    },
    revalidate: 30,
  };
};
