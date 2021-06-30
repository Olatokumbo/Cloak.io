import Head from "next/head";
import ReactTypingEffect from "react-typing-effect";
import Image from "next/image";
import CategoryList from "../sections/CategoryList";
import Explore from "../sections/Explore";
import SignupBanner from "../sections/SignupBanner";
import Guides from "../sections/Guides";
import Layout from "../components/Layout";
import PublicRoute from "../hoc/PublicRoute";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CategoryList />
        <main className="md:p-10 p-2">
          <div className="flex flex-1 flex-col justify-center items-center">
            <div className="flex flex-col my-9">
              <h1 className="text-5xl font-bold sm:text-7xl md:text-9xl">
                Hire{" "}
              </h1>
              <h1 className="text-5xl font-bold sm:text-7xl md:text-9xl bg-gradient-to-r from-pink-500 via-blue-500 to-indigo-900 bg-clip-text text-transparent ">
                {
                  <ReactTypingEffect
                    text={[
                      "Creators",
                      "Developers",
                      "Writers",
                      "Designers",
                      "Editors",
                      "Illustrators",
                      "Artists",
                      "Analysts",
                    ]}
                    speed={100}
                    eraseDelay={300}
                    eraseSpeed={100}
                    typingDelay={200}
                  />
                }
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-center max-w-md text-sm px-3 md:max-w-2xl">
                Cloak.io is a Nigerian-based platform wherein various freelancer or
                entrepreneurs can advertise their skills, businesses, and ideas to
                others. Here at cloak.io we efficiently aim to connect business to
                consumers. Join us and be amazed by our community
              </h5>
              <div className="flex mx-auto mt-16">
                <button
                  onClick={() => router.push("/signin")}
                  className="mx-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900"
                >
                  Get Started
                </button>
                {/* <button className="mx-5 focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-black border-solid border-4 rounded-md hover:bg-gray-200">
                  Join the Force
                </button> */}
              </div>
              {/* <h6 className="my-3 text-gray-700 text-xs">
                Lorem ipsum dolor sit amet, consectetur
              </h6> */}
            </div>
          </div>
          <Explore />
          <Guides />
          <SignupBanner />
        </main>
      </Layout>
    </div>
  );
};

export default PublicRoute(Home);
