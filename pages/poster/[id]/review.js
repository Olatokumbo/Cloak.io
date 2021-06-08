import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { TextField, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import { viewWorkOrder } from "../../../redux/actions/hires";
const Review = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState(2);
  const [description, setDescription] = useState("");
  const [workDetails, setWorkDetails] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const data = await viewWorkOrder(id);
          setWorkDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  if (workDetails.done === false) return <Layout>Can't write a review</Layout>;
  return (
    <Layout>
      <div className="w-full min-h-screen p-4 flex flex-col-reverse md:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-lg font-semibold">User Feedback</h1>
          <form className="max-w-96 sm:w-96 m-auto">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              label="Description"
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              value={description}
              margin="normal"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!(value && description)}
            >
              Submit Review
            </Button>
          </form>
        </div>
        <div className="flex-3 p-4">
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
            <h5 className="text-sm font-semibold text-gray-800">
              Client ID: {workDetails.customerId}
            </h5>
            <h1 className="font-bold text-lg my-5 text-gray-800">
              Description
            </h1>
            {workDetails?.description?.map((text, index) => (
              <p key={index} className="my-3 text-sm">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Review;
