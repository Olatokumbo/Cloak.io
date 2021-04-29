import ProfileCarousel from "../../components/ProfileCarousel";
import ProfileComment from "../../components/ProfileComment";
const Profile = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-2 bg-white py-5 px-10">
        <h1 className="text-2xl font-semibold my-5">
          Full Stack Web Developer
        </h1>
        <div className="flex items-center  mb-7">
          <img
            src="/davidO.jpg"
            alt="me"
            className="w-10 max-h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <h4 className="ext-base font-bold text-gray-800">faithodesola</h4>
            <h6 className="text-xs text-gray-600">Level 2</h6>
          </div>
        </div>
        <h1 className="text-lg font-semibold mt-5">My Works</h1>
        <ProfileCarousel />
        <h1 className="font-bold text-lg my-5 text-gray-800">Description</h1>
        <p className="my-3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="my-3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="mt-20">
          <h1 className="font-bold text-lg text-gray-800 mb-5">Reviews</h1>
          <div className="my-5">
            <ProfileComment />
            <ProfileComment />
            <ProfileComment />
          </div>
          <button className="mx-auto focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-gray-800 border-solid border-4 rounded-md hover:bg-gray-200">
              Load More
            </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-200"></div>
    </div>
  );
};

export default Profile;
