import Head from "next/head";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const Custom404Page = () => {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      <Head>
        <title>404 Page Not Found | Cloak.io</title>
      </Head>
      <Layout>
        <div className="my-20 mx-auto w-full text-center">
          <h1 className=" text-2xl">404 | Page Not Found</h1>
          <button
            onClick={() => router.push(isAuth ? "/explore" : "/")}
            className="my-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900"
          >
            Return to Home
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Custom404Page;
