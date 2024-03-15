import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUserEdit,
  FaSignInAlt,
  FaUserPlus,
  FaEdit,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <div className='bg-white rounded-lg p-8 shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to the Home Page</h1>
        <p className='text-gray-600 mb-4'>
          This is the home page of our social media app.
        </p>
        <div className='flex items-center'>
          <FaHome className='mr-2' />
          <span>Home</span>
          <div className='flex flex-col space-y-4'>
            <Link
              to='/posts'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaHome />
              <span>Posts</span>
            </Link>
            <Link
              to='/post/create'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaPlus />
              <span>Create Post</span>
            </Link>
            <Link
              to='/post/edit/:id'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaEdit />
              <span>Edit Post</span>
            </Link>
            <Link
              to='/profile'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaUser />
              <span>Profile</span>
            </Link>
            <Link
              to='/profile/edit'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaUserEdit />
              <span>Edit Profile</span>
            </Link>
            <Link
              to='/user/login'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
            <Link
              to='/user/register'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaUserPlus />
              <span>Register</span>
            </Link>
            <Link
              to='*'
              className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
            >
              <FaExclamationTriangle />
              <span>Not Found</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
