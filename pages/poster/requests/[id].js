import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  viewWorkOrder,
  finishJob,
  cancelJob,
} from "../../../redux/actions/hires";
import { Button } from "@material-ui/core";
import PrivateRoute from "../../../hoc/PrivateRoute";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DashboardList from "../../../components/DashboardList";
const WorkOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const [workDetails, setWorkDetails] = useState({});
  const userId = useSelector((state) => state.auth.uid);
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const data = await viewWorkOrder(id);
          setWorkDetails(data);
        }
      } catch (error) {}
    };
    getData();
  }, [id]);

  const finish = async () => {
    try {
      await finishJob(id);
      router.push("/poster/requests/done");
    } catch (error) {
      alert(error.message);
    }
  };

  const cancel = async () => {
    try {
      await cancelJob(id);
      router.push("/poster/requests/all");
    } catch (error) {
      alert(error.message);
    }
  };
  if (userId !== workDetails.userId)
    return (
      <Layout>
        <h1>Unauthorized</h1>
      </Layout>
    );
  return (
    <Layout>
      <DashboardList state={3} />
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3"></div>
        <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
          <h1 className="text-2xl font-bold my-1 text-center text-gray-700">
            Work Order
          </h1>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <h1 className="text-2xl font-semibold my-1 text-center md:my-5">
              {workDetails.title}
            </h1>
            <h5 className="text-2xl font-semibold text-gray-800">
              ₦{workDetails.price}
            </h5>
          </div>
          <div>
            {workDetails.completedDate && (
              <h5 className="my-3 text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                Date Completed:{" "}
                {format(
                  new Date(workDetails?.completedDate?.seconds * 1000),
                  "MMMM dd, yyyy"
                )}
              </h5>
            )}
            {workDetails.cancelledDate && (
              <h5 className="my-3 text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                Date Cancelled:{" "}
                {format(
                  new Date(workDetails?.cancelledDate?.seconds * 1000),
                  "MMMM dd, yyyy"
                )}
              </h5>
            )}
          </div>
          <div className="flex items-center">
            <h5 className="text-sm font-semibold text-gray-800">Client:</h5>
            <Link href={`/profile/${workDetails.customerId}`}>
              <h5 className="text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                {workDetails.customerId}
              </h5>
            </Link>
          </div>
          <h1 className="font-bold text-lg my-5 text-gray-800">Description</h1>
          {workDetails?.description?.map((text, index) => (
            <p key={index} className="my-3 text-sm">
              {text}
            </p>
          ))}
          {!workDetails.done && !workDetails.cancelled && (
            <div className="w-full flex justify-between">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                margin="normal"
                // onClick={handleClose}
                onClick={cancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                // className={classes.btn}
                onClick={finish}
              >
                Finish
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(WorkOrder);
