import Head from "next/head";
import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { addReview, viewWorkOrder } from "../../../redux/actions/hires";
import PrivateRoute from "../../../hoc/PrivateRoute";
import { format } from "date-fns";
import Link from "next/link";
import {
  fetchReviewById,
  isHireReviewed,
} from "../../../redux/actions/reviews";
import ReviewCard from "../../../components/ReviewCard";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";
const Review = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState(2);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [workDetails, setWorkDetails] = useState({});
  const [isReviewed, setReviewed] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.auth.uid);
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          setWorkDetails(await viewWorkOrder(id));
          setReviewed(await isHireReviewed(id));
        }
      } catch (error) {
        errorNotification("Error", error.message);
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
        errorNotification("Error", error.message);
      }
    };
    getData();
  }, [isReviewed]);
  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addReview({
        id,
        title,
        message: message.split("\n"),
        rating: value,
        posterId: workDetails.posterId,
        userId: workDetails.customerId,
      });
      setLoading(false);
      successNotification("Success", "Review Added");
      router.push(`/search/${workDetails.posterId}`);
    } catch (error) {
      setLoading(false);
      errorNotification("Error", error.message);
    }
  };
  // if (workDetails.done === false && workDetails.customerId !== userId)
  if (userId === workDetails.customerId) {
    return (
      <>
        <Head>
          <title>Review Poster | Cloak.io</title>
        </Head>
        <Layout>
          <div>
            <div className="flex mb-2 px-6 py-2 border-solid border-b border-gray-200">
              <div>
                <h1 className="text-xl text-gray-800 font-semibold">
                  User Feedback
                </h1>
              </div>
            </div>
            <div className="w-full min-h-screen p-4 flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="p-4">
                  {isReviewed === false ? (
                    <div>
                      <form
                        className="max-w-96 sm:w-96 m-auto flex flex-col items-center"
                        onSubmit={submitReview}
                      >
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          // precision={0.5}
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
                        {loading && <CircularProgress />}
                      </form>
                    </div>
                  ) : (
                    <div>
                      {review && <ReviewCard key={review.id} review={review} />}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-2 p-4">
                <div className="w-full flex justify-between px-3 bg-gray-800">
                  <h1 className="text-sm font-semibold my-1 text-center text-white">
                    Order {id}
                  </h1>
                </div>
                <div className="p-5 border-solid border-gray-100 border-2">
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
                  </div>
                  <div className="flex items-center my-3">
                    <h5 className="text-sm font-semibold text-gray-800">
                      Service Provider:
                    </h5>
                    <Link href={`/profile/${workDetails.customerId}`}>
                      <h5 className="text-sm font-bold text-gray-800 cursor-pointer hover:underline">
                        {workDetails.customerId}
                      </h5>
                    </Link>
                  </div>
                  <Link href={`/search/${workDetails.posterId}`}>
                    <h1 className="font-bold text-gray-800 cursor-pointer hover:underline my-2">
                      View Poster
                    </h1>
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
                <div className="w-full flex justify-between px-3 bg-gray-800">
                  <h1 className="text-sm font-semibold my-1 text-center text-white">
                    Order {id}
                  </h1>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return <Layout>Can't write a review</Layout>;
  }
};

export default PrivateRoute(Review);
