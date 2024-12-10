import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Daily-Task Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My-Daily Task
            </span>
          </Link>

          {/* Large screen buttons */}
          <div className="hidden md:flex md:order-2 space-x-3">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                document
                  .getElementById("newtask")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get started
            </button>
          </div>

          {/* Hamburger menu button for small screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="hidden md:hidden lg:hidden"
          >
            <MenuIcon />
          </IconButton>

          {/* Large screen navigation links */}
          <div className="items-center justify-between hidden md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            padding: "0", // Remove any default padding
            margin: "0", // Ensure there's no margin

            // Include padding and border in height/width
            backgroundColor: "transparent", // Set the background to gray
          },
        }}
      >
        <div
          style={{
            width: "250px",
            height: "450px",
            marginTop: "20vh",
            padding: "20px",
          }}
          className=" bg-gray-800 rounded-lg text-white box-border"
        >
          {" "}
          <div className="flex justify-between">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={toggleDrawer(false)}
              className="p-2 ml-auto"
            >
              <CloseIcon className="w-6 h-6 " />
            </IconButton>
            <div className="inline-block ">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-7 ml-10 mb-2"
                alt="Flowbite Logo"
              />
              <span className=" text-1 font-semibold whitespace-nowrap dark:text-white">
                My-Daily Task
              </span>
            </div>
          </div>
          <ul className="mt-10 space-y-6">
            <li>
              <Link
                to="/"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center py-2 px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-8 h-8 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l9-9m0 0l9 9m-9-9v18"
                  />
                </svg>
                <span className="text-sm font-medium mx-2">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center py-2 px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A6.978 6.978 0 0112 15a6.978 6.978 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm font-medium mx-2">About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center py-2 px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8v3a4 4 0 004 4h2l3 3v-3h2a4 4 0 004-4V8a4 4 0 00-4-4H7a4 4 0 00-4 4z"
                  />
                </svg>
                <span className="text-sm font-medium mx-2">Contact</span>
              </Link>
            </li>
          </ul>
          <p className="text-xs mt-20">
            Powered by{" "}
            <a className="hover:text-gray-700" href="#">
              LMDevPro
            </a>
          </p>
        </div>
      </Drawer>
    </div>
  );
};
export default Header;
