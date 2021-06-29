import Layout from "../components/Layout";
import CategoryList from "../sections/CategoryList";
// import Explore from "../sections/Explore";
import Link from "next/link";
import ProfileCard from "../components/ProfileCard";
import { fetchPosters, fetchNextPosters } from "../redux/actions/posters";
import PrivateRoute from "../hoc/PrivateRoute";
import usePagination from "../hooks/usePagination";
import { Button } from "@material-ui/core";
const Explores = () => {
  const { items, loadMore, _loading, hasMore } = usePagination(
    fetchPosters,
    fetchNextPosters
  );
  return (
    <Layout>
      <CategoryList />
      <div className="w-full flex flex-col-reverse md:flex-row lg:flex-row">
        <div className="flex-1 p-1 md:py-5 md:px-4">
          <div className="p-2 h-full w-full rounded border-solid border-gray-200 border-2 flex flex-col items-center justify-center">
            <h1>Hello there,</h1>
            <h5 className="text-xs text-center">
              Get offers from sellers for your project
            </h5>
          </div>
        </div>
        <div className="flex-4 p-1 md:py-5 md:px-4">
          <div className="w-full relative overflow-hidden h-40">
            <div className="opacity-30 absolute left-0 right-0 top-0 bottom-0 rounded"></div>
            <div className="absolute p-10 flex h-full w-full">
              <div className="flex-1 flex flex-col justify-center items-start">
                <h1 className="text-white text-5xl font-semibold">Explore</h1>
              </div>
              <div className="flex-none md:flex-1"></div>
            </div>
            <img
              src="/rect2.png"
              className="object-cover rounded relative w-full -z-1 h-full"
              height="333"
              width="1440"
            />
          </div>
        </div>
      </div>
      {/* <Explore /> */}
      <h1 className="text-3xl font-bold text-gray-800 ml-5">Popular Posters</h1>
      <div className="flex justify-center flex-col items-center mx-5 my-5">
        <div className="my-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          {items?.map((poster) => (
            <Link key={poster.id} href={`/search/${poster.id}`}>
              <a>
                <ProfileCard data={poster} />
              </a>
            </Link>
          ))}
        </div>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          disabled={!hasMore}
          onClick={loadMore}
        >
          Load more
        </Button>
      </div>
    </Layout>
  );
};

export default PrivateRoute(Explores);

// export const getStaticProps = async () => {
//   const res = await fetchPosters();
//   const posters = JSON.parse(res);
//   return {
//     props: {
//       posters,
//     },
//     revalidate: 1
//   };
// };
