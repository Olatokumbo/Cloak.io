import Layout from "../../components/Layout";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  IconButton,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { format } from "date-fns";
import Link from "next/link";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import { getJobList } from "../../redux/actions/jobs";
import { useSelector } from "react-redux";
import { useState } from "react";
import PrivateRoute from "../../hoc/PrivateRoute";
import useJobs from "../../hooks/useJobs";
const MyJobs = () => {
  // const [jobs, setJobs] = useState([]);
  const [jobState, setJobState] = useState("active");
  const userId = useSelector((state) => state.auth.uid);
  const items = useJobs(userId, jobState);
  // useEffect(() => {
  //   const getJob = async () => {
  //     let jobList = await getJobList(userId);
  //     jobList = JSON.parse(jobList);
  //     setJobs(jobList);
  //   };
  //   getJob();
  // }, [userId]);
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">My Jobs</h1>
        <div className="my-4 mx-auto max-w-2xl">
          <div className="flex flex-col">
            <Link href="/job/new">
              <button className=" mb-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900 w-min whitespace-nowrap">
                Add new Job
              </button>
            </Link>
            <div className="py-3 px-1">
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => setJobState("active")}>Active</Button>
                <Button onClick={() => setJobState("closed")}>Closed</Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="my-4 border-solid border-t border-gray-300">
            <h1 className="text-2xl font-normal text-gray-700 my-4">
              {jobState.charAt(0).toUpperCase() + jobState.slice(1)} Jobs
            </h1>
            <TableContainer /* className={style.table}*/ component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="right">Published Date</TableCell>
                    <TableCell align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell align="right">
                        {format(
                          new Date(job.date.seconds * 1000),
                          "MMMM dd yyyy"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Link href={`/jobs/${job.id}`}>
                          <IconButton>
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(MyJobs);

// export const getServerSideProps = async () => {
//   let jobs;
//   try {
//     jobs = await getJobList(id);
//     jobs = JSON.parse(jobs);
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       jobs,
//     },
//   };
// };
