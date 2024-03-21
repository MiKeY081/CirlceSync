import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // Import the UserCircle icon

const CreatePostTouch = ({ placeholder }) => {
  const { user } = useContext(UserContext);

  return (
    user && (
      <div className='flex items-center border border-gray-300 rounded-lg px-4 py-2'>
        {user.image ? (
          <img
            src={user.image}
            alt='User Avatar'
            className='w-10 h-10 rounded-full mr-3'
          />
        ) : (
          <FaUserCircle className='w-10 h-10 text-gray-500 mr-3' />
        )}
        <Link to='/post/create' className='flex items-center'>
          <FiCamera className='text-gray-500 mr-2' />
          <input
            type='text'
            placeholder={placeholder ? placeholder : "What's on your mind?"}
            className='bg-transparent focus:outline-none flex-grow'
          />
        </Link>
      </div>
    )
  );
};

export default CreatePostTouch;
