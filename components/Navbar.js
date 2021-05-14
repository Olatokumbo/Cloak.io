import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";
import { Avatar, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { BellIcon, MenuAlt3Icon, SearchIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import * as actionCreator from "../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

const Navbar = ({ auth }) => {
  const dispatch = useDispatch();
  const keywordRef = useRef();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const search = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { keyword: keywordRef.current.value },
    });
  };
  const signedOut = () => {
    dispatch(actionCreator.signout());
  };

  return (
    <nav className="flex flex-col justify-between items-center py-2 px-5 sm:py-5  top-0 left-0 right-0 sm:flex-row w-full bg-white border-b-2 border-gray-100 border-solid">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-start flex-col sm:flex-row sm:items-center w-full">
          <div className="flex items-center justify-between w-full sm:w-auto md:w-auto">
            <Link href={auth.isAuth ? "/explore" : "/"}>
              <h1 className="text-2xl font-light hover: cursor-pointer mr-5">
                cloak.io
              </h1>
            </Link>
            <MenuAlt3Icon
              className="h-6 w-6 lg:hidden md:hidden sm:hidden cursor-pointer block"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <form className="flex w-full sm:w-60 my-3 sm:my-0" onSubmit={search}>
            <input
              className="rounded-l-lg  px-3 py-2 w-full border-t mr-0 border-b border-l text-gray-800  text-sm border-gray-200 bg-white focus:outline-none focus:border-gray-400"
              placeholder="Search Services"
              ref={keywordRef}
              required
            />
            <button className="px-3 rounded-r-lg bg-gray-700  text-gray-800 font-bold py-2 uppercase border-gray-400 border-t border-b border-r focus:outline-none">
              <SearchIcon className="h-6 w-6 text-white" />
            </button>
          </form>
        </div>
      </div>
      <div
        id="menu"
        className={
          "items-center sm:flex md:flex" + (isOpen ? " flex" : " hidden")
        }
      >
        <div className="flex list-none lg:ml-auto items-center justify-center sm:flex-row">
          {!auth.uid ? (
            <ul className="flex items-center">
              <li className="sm:my-0 my-1">
                <Link href="/jobs">
                  <h1 className="mx-4 hover: cursor-pointer text-lg font-semibold text-gray-700 whitespace-nowrap">
                    Find Jobs
                  </h1>
                </Link>
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
          ) : (
            <ul className="flex items-center">
              <li className="sm:my-0 my-1">
                <Link href="/jobs">
                  <h1 className="mx-4 hover: cursor-pointer text-lg font-semibold text-gray-700 whitespace-nowrap">
                    Find Jobs
                  </h1>
                </Link>
              </li>
              <li className="sm:my-0 my-1">
                {/* <Link href="/signin"> */}
                <BellIcon className="h-6 w-6 text-gray-600 mx-5 cursor-pointer hover:text-gray-900" />
                {/* </Link> */}
              </li>
              <li className="sm:my-0 my-1">
                {/* <div className="relative object-cover w-10 h-10 mx-4">
                  <Image
                    src={auth.photoURL}
                    layout="fill"
                    className="rounded-full"
                    onClick={handleClick}
                  />
                </div> */}
                <Avatar
                  src={auth.photoURL}
                  className={classes.avatar}
                  onClick={handleClick}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  getContentAnchorEl={null}
                >
                  <MenuItem onClick={()=>router.push(`/profile/${auth.uid}`)}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={signedOut}>Logout</MenuItem>
                </Menu>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
