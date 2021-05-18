import Layout from "../../components/Layout";
import CategoryList from "../../sections/CategoryList";
import { Avatar, makeStyles } from "@material-ui/core";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { fetchUser, getAllProfileId } from "../../redux/actions/profile";
import { fetchPostersByUserId } from "../../redux/actions/posters";
import MyPosterCard from "../../components/MyPosterCard";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
}));
const Profile = ({ user, posters }) => {
  const classes = useStyles();
  const uid = useSelector((state) => state.auth.uid);

  return (
    <Layout>
      <CategoryList />
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3">
          <div className="flex flex-col justify-center items-center p-10 w-full border-solid border-gray-300 border-2">
            <Avatar src="/davidO.jpg" className={classes.avatar} />
            <h1>{user.displayName}</h1>
            <div className="flex items-end mb-2">
              <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
              <h5 className="text-xs text-gray-500">{user.location}</h5>
            </div>
            {uid !== user.id && (
              <button className="mt-2 mb-1 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
                Contact Me
              </button>
            )}
            <h5 className="text-xs text-gray-500">
              Member Since{" "}
              {format(new Date(user.joined.seconds * 1000), "MMMM yyyy")}
            </h5>
          </div>
          <div className="flex flex-col p-5 w-full border-solid border-gray-300 border-2 mt-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-gray-700 mb-3">Description</h1>
              {uid === user.id && (
                <h1 className="font-normal text-gray-500 mb-3 cursor-pointer underline">
                  Edit
                </h1>
              )}
            </div>
            <h5 className="text-sm">{user.description}</h5>
          </div>
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 ml-2">
              My Posters
            </h1>
            {uid === user.id && (
              <Link href="/poster/new">
                <button className="bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
                  Add Poster
                </button>
              </Link>
            )}
          </div>
          <div className="my-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {posters.map((poster) => (
              <MyPosterCard key={poster.id} data={poster} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

export const getStaticPaths = async () => {
  const res = await getAllProfileId();
  const data = JSON.parse(res);

  const paths = data.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let user = await fetchUser(context.params.id);
  let posters = await fetchPostersByUserId(context.params.id);
  user = JSON.parse(user);
  posters = JSON.parse(posters);

  return {
    props: {
      user,
      posters,
    },
    revalidate: 1
  };
};
