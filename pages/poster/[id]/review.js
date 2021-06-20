import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { TextField, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { addReview, viewWorkOrder } from "../../../redux/actions/hires";
import PrivateRoute from "../../../hoc/PrivateRoute";
import Link from "next/link";
import {
  fetchReviewById,
  isHireReviewed,
} from "../../../redux/actions/reviews";
import ReviewCard from "../../../components/ReviewCard";
const Review = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState(2);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [workDetails, setWorkDetails] = useState({});
  const [isReviewed, setReviewed] = useState(null);
  const [review, setReview] = useState("");
  const userId = useSelector((state) => state.auth.uid);
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          setWorkDetails(await viewWorkOrder(id));
          setReviewed(await isHireReviewed(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (isReviewed === true && workDetails.reviewId) {
          setReview(await fetchReviewById(workDetails.reviewId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [isReviewed]);
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        id,
        title,
        message: message.split("\n"),
        rating: value,
        posterId: workDetails.posterId,
        userId: workDetails.customerId,
      });
      alert("Done");
      router.push(`/search/${workDetails.posterId}`);
    } catch (error) {
      console.log(error);
    }
  };
  // if (workDetails.done === false && workDetails.customerId !== userId)
  if (userId === workDetails.customerId) {
    return (
      <Layout>
        <div className="w-full min-h-screen p-4 flex flex-col lg:flex-row">
          <div className="flex-1 p-4">
            {isReviewed === false ? (
              <div>
                <h1 className="text-lg font-semibold">User Feedback</h1>
                <form
                  className="max-w-96 sm:w-96 m-auto"
                  onSubmit={submitReview}
                >
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <TextField
                    label="Title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={title}
                    margin="normal"
                    inputProps={{ maxLength: 40 }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    value={message}
                    margin="normal"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!(value && message && workDetails)}
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                {review && <ReviewCard key={review.id} review={review} />}
              </div>
            )}
          </div>
          <div className="flex-2 p-4">
            <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
              <h1 className="text-2xl font-bold my-1 text-center">
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
              <div className="flex items-center">
                <h5 className="text-sm font-semibold text-gray-800">
                  Service Provider:
                </h5>
                <Link href={`/profile/${workDetails.userId}`}>
                  <h5 className="text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                    {workDetails.userId}
                  </h5>
                </Link>
              </div>
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
  } else {
    return <Layout>Can't write a review</Layout>;
  }
};

export default PrivateRoute(Review);
