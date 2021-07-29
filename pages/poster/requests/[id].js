import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  viewWorkOrder,
  finishJob,
  cancelJob,
  nextStageWorkOrder,
} from "../../../redux/actions/hires";
import { Button } from "@material-ui/core";
import PrivateRoute from "../../../hoc/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import DashboardList from "../../../components/DashboardList";
import OrderStatusFlag from "../../../components/OrderStatusFlag";
import OrderStages from "../../../components/OrderStages";

const WorkOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const userId = useSelector((state) => state.auth.uid);
  const workDetails = useSelector((state) => state.hire.workOrder);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(viewWorkOrder(id));
    }
  }, [id]);

  useEffect(() => {
    if (workDetails.done) {
      setActiveStep(4);
    } else setActiveStep(workDetails.stage);
  }, [workDetails]);
  const handleNext = async () => {
    try {
      await nextStageWorkOrder(id);
    } catch (error) {
      console.log(error);
    }
  };

  const finish = async () => {
    try {
      await finishJob(id);
      router.push("/poster/requests/selling/completed");
    } catch (error) {
      alert(error.message);
    }
  };

  const cancel = async () => {
    try {
      await cancelJob(id);
      router.push("/poster/requests/selling/cancelled");
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
      <div className="flex p-3 flex-col md:flex-row min-h-screen">
        <div className="flex-none px-3 md:flex-1"></div>
        <div className="flex-1 md:flex-2 lg:flex-3 h-full w-full border-solid border-gray-100 border-2">
          <div className="w-full flex justify-between px-3 bg-gray-800">
            <h1 className="text-sm font-semibold my-1 text-center text-white">
              Order {id}
            </h1>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center flex-col md:flex-row">
              <h1 className="text-xl font-semibold my-1 md:my-5">
                {workDetails.title}
              </h1>
              <h5 className="text-3xl font-normal text-gray-800 mx-3">
                ₦{workDetails.price}
              </h5>
            </div>
            <div className="flex justify-between items-center w-full">
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
              <OrderStatusFlag
                cancelled={workDetails.cancelled}
                done={workDetails.done}
              />
            </div>
            <div className="flex items-center my-3">
              <h5 className="text-sm font-semibold text-gray-800">Client: </h5>
              <Link href={`/profile/${workDetails.customerId}`}>
                <h5 className="text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                  {workDetails.customerId}
                </h5>
              </Link>
            </div>
            <Link href={`/search/${workDetails.posterId}`}>
              <a target="_blank">
                <h1 className="font-bold text-gray-800 cursor-pointer hover:underline my-2">
                  View Poster
                </h1>
              </a>
            </Link>
            <hr />
            <div className="mb-2">
              <h1 className="font-bold text-lg my-5 text-gray-800">
                Description
              </h1>
              {/* <hr /> */}
              {workDetails?.description?.map((text, index) => (
                <p key={index} className="my-3 text-sm">
                  {text}
                </p>
              ))}
            </div>
            <div>
              {/* Job stages */}
              <OrderStages activeStep={activeStep} />
            </div>
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
                  variant="contained"
                  color="primary"
                  margin="normal"
                  // className={classes.btn}
                  onClick={activeStep === 3 ? finish : handleNext}
                >
                  {activeStep === 3 ? "Finish" : "Next"}
                </Button>
              </div>
            )}
          </div>
          <div className="w-full flex justify-between border-solid px-3 bg-gray-800">
            <h1 className="text-sm font-semibold my-1 text-center text-white">
              Order {id}
            </h1>
          </div>
        </div>
        <div className="flex-none px-3 md:flex-1"></div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(WorkOrder);
