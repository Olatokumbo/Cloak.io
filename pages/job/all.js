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
} from "@material-ui/core";
import { format } from "date-fns";
import Link from "next/link";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { getJobList } from "../../redux/actions/jobs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const userId = useSelector((state) => state.auth.uid);
  useEffect(() => {
    const getJob = async () => {
      let jobList = await getJobList(userId);
      jobList = JSON.parse(jobList);
      console.log(jobList);
      setJobs(jobList);
    };
    getJob();
  }, [userId]);
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">My Jobs</h1>
        <div className="my-4 mx-auto max-w-2xl">
          <Link href="/job/new">
            <button className=" mb-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
              Add new Job
            </button>
          </Link>
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
                {jobs?.map((job) => (
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
    </Layout>
  );
};

export default MyJobs;

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
