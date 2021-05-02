import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
const Signup = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  return (
    <div className="w-full flex flex-row-reverse min-h-screen">
      <div className="flex-1 relative hidden sm:block">
        <Image
          src="/wallpaper.jpg"
          className="object-cover w-full h-full"
          layout="fill"
        />
      </div>
      <div className="flex flex-col flex-2 py-12 px-4 items-center sm:px-8">
        <div className="flex justify-between w-full items-center">
          <Link href="/">
            <h1 className="text-xl font-light cursor-pointer">
              cloak.io
            </h1>
          </Link>
          <h5 className="text-sm">
            Have an Account?{" "}
            <Link href="/signin" className="cursor-pointer">
              <span className="text-base text-blue-700 font-semibold">
                Signin
              </span>
            </Link>
          </h5>
        </div>
        <div className="flex flex-col p-3 items-center my-8 w-full md:w-96">
          <h1 className="self-start text-4xl font-bold my-4 text-gray-600">
            Create Account
          </h1>
          <div className="flex">
            <div className="w-full mb-2 mr-2">
              <label htmlFor="firstName" className="text-gray-700 text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                ref={firstName}
                className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="w-full mb-2">
              <label htmlFor="lastName" className="text-gray-700 text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                ref={lastName}
                className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <label htmlFor="email" className="text-gray-700 text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              ref={email}
              className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="password" className="text-gray-700 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={password}
              className=" rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="password"
              placeholder="Password"
            />
          </div>
          <button className="my-5 w-full bg-gradient-to-r from-blue-500 to-indigo-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-900  text-white rounded-md py-4 focus:outline-none">
            Create an Account
          </button>
          <h5 className="text-gray-500">or</h5>
          <button className="flex items-center justify-center my-5 w-full text-gray-600  text-sm border-2 rounded-md py-3 focus:outline-none hover:bg-gray-100">
            <img className="h-5 mx-3" src="/google.svg" /> Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
