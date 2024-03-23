import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import UserTab from "../../components/UserTab";

const FollowersPanel = ({ followers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <div
        className='bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300'
        onClick={toggleBox}
      >
        <span className='text-gray-800'>{followers?.length} Followers</span>
      </div>
      {isOpen && (
        <div className='absolute top-full left-0 w-64 bg-white border border-gray-300 rounded shadow-lg py-2 z-10'>
          <button
            className='absolute top-0 right-0 mr-2 mt-2 text-gray-600 hover:text-gray-800'
            onClick={toggleBox}
          >
            <FaTimes />
          </button>
          {followers?.length !== 0 ? (
            followers.map((follower, index) => (
              <UserTab key={index} user={follower} />
            ))
          ) : (
            <p className='px-4 text-gray-600'>No followers yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowersPanel;
