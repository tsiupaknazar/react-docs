import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="flex flex-col items-center max-h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-[#4385F3]">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-700">Sorry, we couldn't find this page.</p>
        </div>
      </div>
      <Link to="/" className="px-8 py-3 font-semibold rounded bg-[#4385F3] hover:bg-blue-600 text-white">Back to home</Link>
    </section>
  )
}

export default NotFound