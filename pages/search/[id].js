import { useState, useEffect } from "react";
import HireModal from "../../components/HireModal";
import Layout from "../../components/Layout";
import ProfileCarousel from "../../components/ProfileCarousel";
import { getAllPostersId, fetchPostersbyId } from "../../redux/actions/posters";
import CategoryList from "../../sections/CategoryList";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { isWorkOrderActive } from "../../redux/actions/hires";
import { useRouter } from "next/router";
import ReviewCard from "../../components/ReviewCard";
import useReviews from "../../hooks/useReviews";
import { warningNotification } from "../../utils/notifications";
import { Rating } from "@material-ui/lab";
import { Chip } from "@material-ui/core";
import {
  Avatar,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { getReview } from "../../utils/reviews";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 40,
    height: 40,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Profile = ({ poster }) => {
  const router = useRouter();
  const { id } = router.query;
  const classes = useStyles();
  const uid = useSelector((state) => state.auth.uid);
  const isActive = useSelector((state) => state.hire.isWorkOrderActive);
  const pageLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const [buttonState, setButtonState] = useState(false);
  const [open, setOpen] = useState(false);
  // const [reviews, setReviews] = useState([]);
  const { reviews, notFound, loading, hasMore, loadMore } = useReviews(id);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!poster)
    return (
      <Layout>
        <CategoryList />
        Loading...
      </Layout>
    );
  const contactMe = () => {
    if (uid) setButtonState(true);
    else warningNotification("Warning", "Please Sign in");
  };
  const hireMe = () => {
    if (uid && isActive === true) handleOpen();
    else if (uid && isActive === false) {
      warningNotification(
        "Warning",
        "You have an active work order with this Service"
      );
    } else warningNotification("Warning", "Please Sign in");
  };

  useEffect(() => {
    if (uid && id) {
      dispatch(isWorkOrderActive(uid, poster.userId, id));
    }
  }, [uid]);
  // useEffect(() => {
  //   const getData = async () => {
  //     let data = await fetchReviews(id);
  //     setReviews(data);
  //   };
  //   getData();
  // }, [id]);
  return (
    <Layout>
      <CategoryList />
      <div className="flex">
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
        <div className="flex-3 bg-white px-2 xs:px-5 md:px-10">
          {(isActive === false) && (
            <div className="w-full flex justify-between py-2 px-3 bg-green-600 rounded-b-xl">
              <h1 className="text-sm font-semibold my-1 text-center text-white">
                You already have an Active Order here
              </h1>
            </div>
          )}
          <div className="py-5">
            <div>
              <div className="flex justify-between items-center flex-col md:flex-row">
                <h1 className="text-2xl font-semibold my-1 text-center md:my-5">
                  {poster.title}
                </h1>
                <h5 className="text-3xl font-semibold text-gray-800">
                  ₦{poster.price}
                </h5>
              </div>
              <div className="flex justify-center md:justify-start mb-3">
                <Rating
                  name="simple-controlled"
                  value={getReview(poster.ratings)}
                  precision={0.5}
                  readOnly
                />
                <h1 className="text-yellow-400 font-bold">
                  {getReview(poster.ratings)}
                </h1>
                <h5 className="mx-1 font-medium text-gray-400">
                  ({poster.ratings.length})
                </h5>
              </div>
            </div>
            <div className="flex justify-between mb-3 flex-col xs:flex-row">
              <div className="flex items-center my-4 mx-auto xs:mx-0 xs:my-0">
                <Avatar
                  src={poster.authorData.photoURL}
                  className={classes.avatar}
                />
                <div className="flex flex-col">
                  <Link href={`/profile/${poster.userId}`}>
                    <h4 className="text-base font-bold text-gray-800 cursor-pointer hover:underline">
                      {poster.authorData.displayName}
                    </h4>
                  </Link>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h5 className="text-xs self-end text-gray-500">
                      {poster.location || "Unspecified"}
                    </h5>
                  </div>
                </div>
              </div>
              {uid !== poster.userId && (
                <div className="flex flex-col">
                  <button
                    onClick={contactMe}
                    className="mb-2 md:ml-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 xs:w-full rounded-md hover:bg-gray-900"
                  >
                    {buttonState ? poster.phoneNumber : "Show Contact"}
                  </button>
                  {poster.visibility ? (
                    <button
                      onClick={hireMe}
                      className="md:ml-5 focus:outline-none px-3 py-2 sm:px-4 md:px-4 xs:w-full border-black border-solid border-2 rounded-md hover:bg-gray-200"
                    >
                      Hire Me
                    </button>
                  ) : (
                    <h5 className="md:ml-5">Not Available</h5>
                  )}
                </div>
              )}
            </div>
            <div>
              {poster.keywords.map((tag, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  color="primary"
                  className={classes.chip}
                  label={tag}
                />
              ))}
            </div>
            <h1 className="text-lg font-semibold mt-2">My Works</h1>
            <ProfileCarousel images={poster?.works} />
            <h1 className="font-bold text-lg my-5 text-gray-800">
              Description
            </h1>
            {poster.description.map((text, index) => (
              <p key={index} className="my-3 text-sm">
                {text}
              </p>
            ))}
            <div className="mt-10 py-5 border-t-2 border-gray-100 border-solid">
              <h1 className="font-bold text-lg text-gray-800 mb-1">Reviews</h1>
              <div className="my-2">
                <div>
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                  {notFound && (
                    <h5 className="text-center text-xl">No Reviews Yet</h5>
                  )}
                  {loading && <CircularProgress />}
                </div>
              </div>
              {!notFound && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={!hasMore}
                  onClick={loadMore}
                >
                  Load More
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
      </div>
      <HireModal
        open={open}
        handleClose={handleClose}
        id={uid}
        data={{
          title: poster.title,
          price: poster.price,
          userId: poster.userId,
          posterId: id,
        }}
      />
    </Layout>
  );
};

export default Profile;

export const getStaticPaths = async () => {
  let posterIds = await getAllPostersId();
  posterIds = JSON.parse(posterIds);
  const paths = posterIds.map((id) => ({
    params: { id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  let poster = await fetchPostersbyId(params.id);
  if (!poster) return { notFound: true };
  poster = JSON.parse(poster);
  return {
    props: {
      poster,
    },
    revalidate: 1,
  };
};
