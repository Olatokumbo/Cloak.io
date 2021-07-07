import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchJobById,
  getAllJobsId,
  applyJob,
  withdrawJob,
  isJobApplied,
} from "../../redux/actions/jobs";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import AppliedUser from "../../components/AppliedUser";
import {
  errorNotification,
  warningNotification,
} from "../../utils/notifications";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 40,
    height: 40,
  },
}));

const JobInfo = ({ job }) => {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();
  const { isAuth, uid } = useSelector((state) => state.auth);
  const appliedState = useSelector((state) => state.job.jobApplied);
  // const [appliedState, setAppliedState] = useState(false);
  // const [buffer, setBuffer] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (uid && id) {
      dispatch(isJobApplied(id, uid));
    }
  }, [uid, id]);
  const apply = async () => {
    if (isAuth) {
      try {
        await applyJob(job.id, uid);
        // localStorage.setItem(job.id, uid);
        // setBuffer((prevState) => !prevState);
      } catch (error) {
        alert(error.message);
      }
    } else {
      warningNotification("Warning", "Please Sign in");
    }
  };

  const withdraw = async () => {
    try {
      await withdrawJob(job.id, uid);
      // setBuffer((prevState) => !prevState);
      // console.log("remove");
      // localStorage.removeItem(job.id);
      // setAppliedState(false);
    } catch (error) {
      errorNotification("Error", error.message);
    }
  };
  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
        <div className="flex-3 bg-white py-5 px-5 md:px-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold my-5">{job?.title}</h1>
            <h5 className="text-2xl font-semibold text-gray-800">
              {`₦${job.price}` || ""}
            </h5>
          </div>
          <div className="flex justify-between mb-7">
            <div className="flex items-center">
              <Avatar src={job.authorData.photoURL} className={classes.avatar} />
              <div className="flex flex-col">
                <Link href={`/profile/${job.userId}`}>
                  <h4 className="text-base font-bold text-gray-800 cursor-pointer hover:underline">
                    {job.authorData.displayName}
                  </h4>
                </Link>
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
          {uid === job.userId && (
            <div className="my-5">
              <h1 className="text-xl font-semibold text-gray-700 mb-4">
                Applications
              </h1>
              <div>
                {job.applied.length > 0 ? (
                  <TableContainer
                    /* className={style.table}*/ component={Paper}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Username</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">View Profile</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {job.applied.map((id) => (
                          <AppliedUser key={id} id={id} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <h1 className="text-center">None Applied Yet</h1>
                )}
              </div>
            </div>
          )}
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
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const res = await fetchJobById(context.params.id);
  const data = JSON.parse(res);
  return {
    props: {
      job: data,
    },
    revalidate: 1,
  };
};
