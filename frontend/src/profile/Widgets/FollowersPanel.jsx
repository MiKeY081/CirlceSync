import React, { useEffect, useState } from "react";
import { FaTimes, FaUserFriends } from "react-icons/fa";
import UserTab from "../../components/UserTab";
import axios from "axios";
import UserCard from "./UserCard";

const FollowersPanel = ({ followers, open }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [follower, setFollower] = useState([]);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const fetchedFollowers = [];
        for (const follower of followers) {
          const { data } = await axios.get(
            `/user/getuser/${follower?.followerId}`
          );
          if (data.success) {
            fetchedFollowers.push(data.user);
          }
        }
        setFollower(fetchedFollowers);
      } catch (error) {
        console.log("Error fetching followers:", error);
      }
    };

    if (followers?.length > 0) {
      getUserById();
    }
  }, [followers]);

  return !open ? (
    <div className='relative'>
      <div
        className='bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 flex items-center justify-between'
        onClick={toggleBox}
      >
        <span className='text-gray-800'>{followers?.length} Followers</span>
        <FaUserFriends className='text-gray-600 ml-2' />
      </div>
      {isOpen && (
        <div className='absolute top-full left-0 w-64 bg-white border border-gray-300 rounded shadow-lg py-2 z-10'>
          <button
            className='absolute top-0 right-0 mr-2 mt-2 text-gray-600 hover:text-gray-800'
            onClick={toggleBox}
          >
            <FaTimes />
          </button>
          {follower?.length > 0 ? (
            follower.map((user, index) => <UserTab key={index} user={user} />)
          ) : (
            <p className='px-4 text-gray-600'>No followers yet.</p>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-col'>
      <h2 className='text-2xl font-bold mb-4'>Followers</h2>
      <div className='grid grid-cols-2 gap-8'>
        {follower?.length > 0 ? (
          follower.map((user, index) => <UserCard key={index} user={user} />)
        ) : (
          <p className='px-4 text-gray-600'>No followers yet.</p>
        )}
      </div>
    </div>
  );
};

export default FollowersPanel;
