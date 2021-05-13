import Layout from "../../components/Layout";
import CategoryList from "../../sections/CategoryList";
import { Avatar } from "@material-ui/core";
import { LocationMarkerIcon } from "@heroicons/react/solid";
const Profile = () => {
  return (
    <Layout>
      <CategoryList />
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3 sticky h-screen top-5">
          <div className="flex flex-col justify-center items-center p-10 w-full border-solid border-gray-300 border-2">
            <Avatar src="/davidO.jpg" />
            <h1>David Odesola</h1>
            <div className="flex">
              <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
              <h5 className="text-xs text-gray-500">Lagos, Nigeria</h5>
            </div>
            <button className="mt-5 mb-1 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
              Contact Me
            </button>
            <h5 className="text-xs text-gray-500">Member Since June 2020</h5>
          </div>
          <div className="flex flex-col p-5 w-full border-solid border-gray-300 border-2 mt-5">
            <h1 className="font-semibold text-gray-700 mb-3">Description</h1>
            <h5 className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h5>
          </div>
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 h-screen w-full p-5 border-solid border-gray-100 border-2">
        <h1 className="text-3xl font-bold text-gray-800 ml-2">My Posters</h1>
          <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
