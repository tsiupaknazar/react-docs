import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center max-h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-[#4385F3]">
            <span className="sr-only">Error</span>
            <span className="cursor-pointer transition hover:text-blue-600">4</span>
            <span className="cursor-pointer transition hover:text-blue-600">0</span>
            <span className="cursor-pointer transition hover:text-blue-600">4</span>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-primary">
            Sorry, we couldn't find this page.
          </p>
        </div>
      </div>
      <Link
        to="/"
        className="px-8 py-3 font-semibold rounded bg-blue-500 text-white transition delay-75 hover:bg-blue-600"
      >
        Back to home
      </Link>
    </section>
  );
};

export default NotFound;
