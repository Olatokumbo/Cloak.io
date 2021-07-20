import Image from "next/image";
import CategoryList from "../../sections/CategoryList";
import PosterCard from "../../components/PosterCard";
import Link from "next/link";
import Layout from "../../components/Layout";
import fs from "fs";
import path from "path";
import {
  fetchPostersbyCategory,
  fetchNextPostersbyCategory,
} from "../../redux/actions/posters";
import { useRouter } from "next/router";
import usePoster from "../../hooks/usePoster";
import { CircularProgress, Button } from "@material-ui/core";

const Category = ({ category }) => {
  const router = useRouter();
  const { id } = router.query;

  const { items, loading, loadMore, hasMore } = usePoster(
    fetchPostersbyCategory,
    fetchNextPostersbyCategory,
    id
  );
  return (
    <Layout>
      <CategoryList id={id} />
      <div className="w-full relative overflow-hidden mb-9">
        <div className="opacity-50 bg-gray-900 absolute left-0 right-0 top-0 bottom-0 rounded"></div>
        <div className="absolute p-10 flex h-full w-full">
          <div className="flex-1 flex flex-col justify-center items-start">
            <h1 className="text-white text-3xl font-semibold">
              {category.title}
            </h1>
          </div>
          <div className="flex-none md:flex-1"></div>
        </div>
        <div className="flex-1 relative -z-1 h-40">
          <Image
            src={category.photoURL}
            className="object-cover"
            layout="fill"
            loading="eager"
            priority
          />
        </div>
      </div>
      <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
        <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          {items?.map((poster) => (
            <Link key={poster.id} href={`/search/${poster.id}`}>
              <a>
                <PosterCard data={poster} />
              </a>
            </Link>
          ))}
        </div>
        {loading && <CircularProgress />}
        {items.length > 0 && (
          <div className="w-full flex justify-center py-2 my-2">
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
        )}
      </div>
    </Layout>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let fileData = fs.readFileSync(filePath);
  fileData = JSON.parse(fileData);
  let paths = fileData.map((data) => ({
    params: { id: data.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let fileData = fs.readFileSync(filePath);
  fileData = JSON.parse(fileData);
  const category = fileData.filter((data) => data.id === params.id)[0];
  // let posters = await fetchPostersbyCategory(params.id);
  // posters = JSON.parse(posters);
  return {
    props: {
      category,
      // posters,
    },
    // revalidate: 30,
  };
};
