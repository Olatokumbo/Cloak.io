import Head from "next/head";
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
import useBuying from "../../../../hooks/useBuying";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const AllHireRequests = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.auth.uid);
  const orderState = router.query.state;
  const { items, loading } = useBuying(orderState, userId);
  return (
    <>
      <Head>
        <title>Buying ({orderState}) | Cloak.io</title>
      </Head>
      <Layout>
        <DashboardList state={2} />
        <div className="w-full min-h-screen py-4 px-4 md:px-28">
          <h1 className="text-3xl font-semibold text-gray-700">
            Manage Hire Request
          </h1>
          <div className="py-3 px-1">
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => router.push("/poster/hires/buying/active")}
              >
                Active
              </Button>
              <Button
                onClick={() => router.push("/poster/hires/buying/completed")}
              >
                Completed
              </Button>
              <Button
                onClick={() => router.push("/poster/hires/buying/cancelled")}
              >
                Cancelled
              </Button>
            </ButtonGroup>

            <div className="my-4 border-solid border-t border-gray-300">
              <h1 className="text-2xl font-normal text-gray-700 my-4">
                {orderState.length > 3 &&
                  orderState.charAt(0).toUpperCase() + orderState.slice(1)}{" "}
                Hire Requests
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
              {loading && <CircularProgress />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PrivateRoute(AllHireRequests);

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
