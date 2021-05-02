import Image from "next/image";
import Navbar from "../../components/Navbar";
import CategoryList from "../../sections/CategoryList";
import ProfileCard from "../../components/ProfileCard";
import Link from "next/link";

const Category = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CategoryList />
      <div className="w-full relative overflow-hidden mb-9">
        <div className="opacity-50 bg-gray-900 absolute left-0 right-0 top-0 bottom-0"></div>
        <div className="absolute p-10 flex h-full w-full">
          <div className="flex-1 flex flex-col justify-center items-start">
            <h1 className="text-white text-3xl font-semibold">
              Graphics & Design
            </h1>
          </div>
          <div className="flex-none md:flex-1"></div>
        </div>
        <div className="flex-1 relative -z-1 h-40">
          <Image
            src="/wallpaper.jpg"
            className="object-cover"
            layout="fill"
          />
        </div>
      </div>
      <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <Link href="/search/12"><a><ProfileCard /></a></Link>
          <Link href="/search/12"><a><ProfileCard /></a></Link>
          <Link href="/search/12"><a><ProfileCard /></a></Link>
          <Link href="/search/12"><a><ProfileCard /></a></Link>
          <Link href="/search/12"><a><ProfileCard /></a></Link>
          <Link href="/search/12"><a><ProfileCard /></a></Link>
        </div>
    </div>
  );
};

export default Category;
