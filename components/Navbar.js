import { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex flex-col justify-between items-center p-5 top-0 left-0 right-0 sm:flex-row w-screen bg-white border-b-2 border-gray-100 border-solid">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-start flex-col sm:flex-row sm:items-center w-full">
          <div className="flex items-center justify-between w-full sm:w-auto md:w-auto">
            <Link href="/">
              <h1 className="text-2xl font-light hover: cursor-pointer mr-5">
                cloak.io
              </h1>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 lg:hidden md:hidden sm:hidden cursor-pointer block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              htmlFor="menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <form className="flex w-full sm:w-60 my-3 sm:my-0">
            <input
              className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-400"
              placeholder="Search Services"
            />
            <button className="px-3 rounded-r-lg bg-gray-700  text-gray-800 font-bold py-2 uppercase border-gray-400 border-t border-b border-r focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 lg:hidden md:hidden sm:hidden cursor-pointer block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          htmlFor="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg> */}
      </div>
      <div
        id="menu"
        className={
          "items-center sm:flex md:flex" + (isOpen ? " flex" : " hidden")
        }
      >
        <ul className="flex list-none lg:ml-auto items-center justify-center sm:flex-row">
          <li className="sm:my-0 my-1">
            <h1 className="mx-4 hover: cursor-pointer">Contact</h1>
          </li>
          <li className="sm:my-0 my-1">
            <Link href="/signin">
              <h1 className="mx-4 hover: cursor-pointer">Login</h1>
            </Link>
          </li>
          <li className="sm:my-0 my-1">
            <Link href="/signup">
              <button className="mx-4 bg-black text-white py-1.5 px-2.5 rounded-md hover:bg-gray-900 focus:outline-none">
                Signup
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
