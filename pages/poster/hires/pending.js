import Layout from "../../../components/Layout";
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
// import CheckIcon from "@material-ui/icons/Check";
// import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PrivateRoute from "../../../hoc/PrivateRoute";
import { listPendingHireRequests } from "../../../redux/actions/hires";
import DashboardList from "../../../components/DashboardList";
const PendingHire = () => {
  const userId = useSelector((state) => state.auth.uid);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          const list = await listPendingHireRequests(userId);
          setRequests(list);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [userId]);

  return (
    <Layout>
      <DashboardList state={2} />
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Pending Work Requests
        </h1>
        <div className="my-4 mx-auto max-w-2xl text-center">
          {requests.length > 0 ? (
            <TableContainer /* className={style.table}*/ component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell component="th" scope="row">
                        {request.title}
                      </TableCell>
                      <TableCell align="right">₦{request.price}</TableCell>
                      <TableCell align="right">
                        <Link href={`/poster/hires/${request.id}`}>
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
          ) : (
            "No Pending Work Requests"
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(PendingHire);
