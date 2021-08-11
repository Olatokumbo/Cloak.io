import DashboardList from "../../../../components/DashboardList";
import Layout from "../../../../components/Layout";
import PrivateRoute from "../../../../hoc/PrivateRoute";
import {
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Link from "next/link";
import VisibilityIcon from "@material-ui/icons/Visibility";
import useSelling from "../../../../hooks/useSelling";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { format } from "date-fns";
const AllRequests = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.auth.uid);
  const orderState = router.query.state;
  const { items, loading } = useSelling(orderState, userId);
  return (
    <Layout>
      <DashboardList state={3} />
      <div className="w-full min-h-screen py-4 px-4 md:px-28">
        <h1 className="text-3xl font-semibold text-gray-700">Manage Sales</h1>
        <div className="py-3 px-1">
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => router.push("/poster/requests/selling/active")}
            >
              Active
            </Button>
            <Button
              onClick={() => router.push("/poster/requests/selling/completed")}
            >
              Completed
            </Button>
            <Button
              onClick={() => router.push("/poster/requests/selling/cancelled")}
            >
              Cancelled
            </Button>
          </ButtonGroup>

          <div className="my-4 border-solid border-t border-gray-300">
            <h1 className="text-2xl font-normal text-gray-700 my-4">
              {orderState.length > 3 &&
                orderState.charAt(0).toUpperCase() + orderState.slice(1)}{" "}
              Orders
            </h1>
            <TableContainer /* className={style.table}*/ component={Paper}>
              <Table aria-label="simple table">
                {loading === false && (
                  <TableHead>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell align="left">No Records</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">View</TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                )}
                <TableBody>
                  {items.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell component="th" scope="row">
                        {request.title}
                      </TableCell>
                      <TableCell>₦{request.price}</TableCell>
                      <TableCell>
                        <Link href={`/poster/requests/${request.id}`}>
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
            {loading && <CircularProgress />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(AllRequests);

export const getServerSideProps = async (context) => {
  let state = context.params.state;
  if (state !== "active" && state !== "completed" && state !== "cancelled") {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};
