import { useState } from "react";
import HireModal from "../../components/HireModal";
import Layout from "../../components/Layout";
import ProfileCarousel from "../../components/ProfileCarousel";
import ProfileComment from "../../components/ProfileComment";
import { getAllPostersId, fetchPostersbyId } from "../../redux/actions/posters";
import CategoryList from "../../sections/CategoryList";
import Link from "next/link";
import { useSelector } from "react-redux";
const Profile = ({ poster }) => {
  const uid = useSelector((state) => state.auth.uid);
  const [buttonState, setButtonState] = useState(false);
  const [open, setOpen] = useState(false);
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
    else alert("Please Signin First");
  };
  const hireMe = () => {
    if (uid) handleOpen();
    else alert("Please Signin First");
  };
  return (
    <Layout>
      <CategoryList />
      <div className="flex">
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
        <div className="flex-3 bg-white py-5 px-5 md:px-10">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <h1 className="text-2xl font-semibold my-1 text-center md:my-5">{poster.title}</h1>
            <h5 className="text-2xl font-semibold text-gray-800">
              ₦{poster.price}+
            </h5>
          </div>
          <div className="flex justify-between mb-7 flex-col xs:flex-row">
            <div className="flex items-center my-3 md:my-5 mx-auto xs:mx-0">
              <img
                src={poster.authorData.photoURL}
                alt="me"
                className="w-10 max-h-10 rounded-full mr-3"
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
                <button onClick={hireMe} className="md:ml-5 focus:outline-none px-3 py-2 sm:px-4 md:px-4 xs:w-full border-black border-solid border-2 rounded-md hover:bg-gray-200">
                  Hire Me
                </button>
              </div>
            )}
          </div>
          {/* <h6 className="text-md text-gray-600">Level 2</h6> */}
          <h1 className="text-lg font-semibold mt-5">My Works</h1>
          <ProfileCarousel images={poster?.works} />
          <h1 className="font-bold text-lg my-5 text-gray-800">Description</h1>
          {poster.description.map((text, index) => (
            <p key={index} className="my-3 text-sm">
              {text}
            </p>
          ))}
          <div className="mt-20">
            <h1 className="font-bold text-lg text-gray-800 mb-5">Reviews</h1>
            <div className="my-5">
              {poster.reviews ? (
                poster.reviews?.map((review) => (
                  <ProfileComment review={review} />
                ))
              ) : (
                <h5 className="text-center text-xl">No Reviews Yet</h5>
              )}
            </div>
            {/* <button className="mx-auto focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-gray-800 border-solid border-4 rounded-md hover:bg-gray-200">
              Load More
            </button> */}
          </div>
        </div>
        <div className="flex-none lg:flex-1 bg-gray-200"></div>
      </div>
      <HireModal open={open} handleClose={handleClose} id={uid} data={{title: poster.title, price: poster.price}}/>
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
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let poster = await fetchPostersbyId(params.id);
  poster = JSON.parse(poster);
  return {
    props: {
      poster,
    },
    revalidate: 10,
  };
};
