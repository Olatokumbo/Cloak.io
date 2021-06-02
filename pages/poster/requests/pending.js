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
import {
  // acceptHire,
  // rejectHire,
  listPendingHires,
} from "../../../redux/actions/hires";
const PendingHire = () => {
  const userId = useSelector((state) => state.auth.uid);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          const list = await listPendingHires(userId);
          setRequests(list);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [userId]);

//   const accept = async (id) => {
//     try {
//       await acceptHire(id);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const reject = async (id) => {
//     try {
//       await rejectHire(id);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Pending Hire Requests
        </h1>
        <div className="my-4 mx-auto max-w-2xl">
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
                      <Link href={`/poster/requests/${request.id}`}>
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                      {/* <div className="flex justify-end">
                        <IconButton onClick={accept}>
                          <CheckIcon />
                        </IconButton>
                        <IconButton onClick={reject}>
                          <CloseIcon />
                        </IconButton>
                      </div> */}
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

export default PendingHire;
