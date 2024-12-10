import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import img from "/about-us.jpeg";

const About = () => {
  return (
    <section className="relative bg-white dark:bg-gray-900 flex flex-col items-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-center opacity-25 z-10"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", // Ensures the image covers the whole section
          backgroundPosition: "center", // Keeps the image centered
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 z-10 flex-grow">
        <h1 className="mb-4 mt-20 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          About My-Daily Task App!
        </h1>
        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-8 xl:px-16 dark:text-gray-300">
          In our busy lives, staying organized is super important.{" "}
          <span className="font-bold">My-Daily Task App</span> is here to help
          you keep track of your tasks easily and efficiently. Designed with{" "}
          <span className="font-bold">Tailwind CSS</span>, this app has a clean
          and modern look that makes it simple to use. Built with{" "}
          <span className="font-bold">React.js</span>,{" "}
          <span className="font-bold">My-Daily Task App</span> gives you a
          smooth and responsive experience. Whether you want to add new tasks,
          mark them as done, or change deadlines, everything is quick and easy!
        </p>

        <h2 className="mb-8 font-bold text-lg text-gray-500 lg:text-xl sm:px-8 xl:px-16 dark:text-gray-300">
          Why You’ll Love My-Daily Task App:
        </h2>

        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-8 xl:px-16 dark:text-gray-300">
          <span className="font-bold">Simple Task Management:</span> Adding,
          editing, and deleting tasks is a breeze. Forget about messy notes!
          With this app, you can manage your to-do list digitally, making it
          easy to stay on top of everything.
        </p>

        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-8 xl:px-16 dark:text-gray-300">
          <span className="font-bold">Organized View:</span> See all your tasks
          in one place. The clear layout helps you prioritize what’s important
          so you can stay focused all day. You can also categorize your tasks by
          project or urgency, making it easier to manage your workload.
        </p>

        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-8 xl:px-16 dark:text-gray-300">
          <span className="font-bold">Reliable Tech:</span> Behind the scenes,{" "}
          <span className="font-bold">My-Daily Task App</span> uses{" "}
          <span className="font-bold">Node.js</span> and{" "}
          <span className="font-bold">MySQL</span> to ensure your data is safe
          and secure. This means you can trust that your tasks are always
          accessible and protected.
        </p>

        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
