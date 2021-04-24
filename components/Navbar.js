import { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex flex-col justify-between items-center p-5 top-0 left-0 right-0 sm:flex-row w-screen">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-light hover: cursor-pointer">cloak.io</h1>
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
      <div
        id="menu"
        className={
          "items-center sm:flex md:flex" + (isOpen ? " flex" : " hidden")
        }
      >
        <ul className="flex flex-col list-none lg:ml-auto items-center justify-center sm:flex-row">
          <li className="sm:my-0 my-1">
            <h1 className="mx-4 hover: cursor-pointer">Contact</h1>
          </li>
          <li className="sm:my-0 my-1">
            <h1 className="mx-4 hover: cursor-pointer">Login</h1>
          </li>
          <li className="sm:my-0 my-1">
            <button className="mx-4 bg-black text-white py-1.5 px-2.5 rounded-md hover:bg-gray-900 focus:outline-none">
              Signup
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
