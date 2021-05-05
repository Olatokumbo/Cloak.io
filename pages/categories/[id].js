import Image from "next/image";
import CategoryList from "../../sections/CategoryList";
import ProfileCard from "../../components/ProfileCard";
import Link from "next/link";
import Layout from "../../components/Layout";
import fs from "fs";
import path from "path";
import { fetchPostersbyCategory } from "../../redux/actions/posters";

const Category = ({ category, posters }) => {
  return (
    <Layout>
      <CategoryList />
      <div className="w-full relative overflow-hidden mb-9">
        <div className="opacity-50 bg-gray-900 absolute left-0 right-0 top-0 bottom-0"></div>
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
          />
        </div>
      </div>
      <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {posters?.map((poster) => (
          <Link key={poster.id}href={`/search/${poster.id}`}>
            <a>
              <ProfileCard data={poster} />
            </a>
          </Link>
        ))}
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
  let posters = await fetchPostersbyCategory(params.id);
  posters = JSON.parse(posters);
  return {
    props: {
      category,
      posters
    },
  };
};
