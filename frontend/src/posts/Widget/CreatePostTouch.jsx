import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FiCamera } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // Import the UserCircle icon

const CreatePostTouch = ({ placeholder }) => {
  const { user } = useContext(UserContext);

  return (
    user && (
      <div className='flex items-center border border-gray-300 rounded-lg px-4 py-2 dark:bg-gray-60'>
        {user.image ? (
          <img
            src={user.image}
            alt='User Avatar'
            className='w-10 h-10 rounded-full mr-3'
          />
        ) : (
          <FaUserCircle className='w-10 h-10 text-gray-500 mr-3' />
        )}
        <div className='flex items-center dark:bg-gray-60'>
          <FiCamera className='text-gray-500 mr-2 dark:bg-gray-60' />
          <label
            htmlFor=''
            className='text-gray-500 cursor-pointer dark:bg-gray-60'
          >
            {placeholder ? placeholder : "What's on your mind?"}
          </label>
          <input
            type='hidden'
            placeholder={placeholder ? placeholder : "What's on your mind?"}
            className=' focus:outline-none flex-grow dark:bg-gray-60'
          />
        </div>
      </div>
    )
  );
};

export default CreatePostTouch;
