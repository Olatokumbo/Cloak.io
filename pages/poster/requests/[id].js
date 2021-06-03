import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import { viewWorkOrder } from "../../../redux/actions/hires";
import { Button } from "@material-ui/core";
const WorkOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const [workDetails, setWorkDetails] = useState({});
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
  return (
    <Layout>
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3"></div>
        <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
          <h1 className="text-2xl font-bold my-1 text-center">Work Order</h1>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <h1 className="text-2xl font-semibold my-1 text-center md:my-5">
              {workDetails.title}
            </h1>
            <h5 className="text-2xl font-semibold text-gray-800">
              ₦{workDetails.price}
            </h5>
          </div>
          <h1 className="font-bold text-lg my-5 text-gray-800">Description</h1>
          {workDetails?.description?.map((text, index) => (
            <p key={index} className="my-3 text-sm">
              {text}
            </p>
          ))}
          <div className="w-full flex justify-between">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              margin="normal"
              // onClick={handleClose}
              // className={classes.btn}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              margin="normal"
              // className={classes.btn}
              // onClick={handleDeletePoster}
            >
              Finished
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkOrder;
