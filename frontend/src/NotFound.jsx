import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <FaExclamationTriangle className='text-6xl text-red-500 mb-4' />
      <h1 className='text-2xl font-bold'>404 - Page Not Found</h1>
      <p className='text-gray-500'>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
