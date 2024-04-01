import React, { useEffect, useState } from "react";
import { FaTimes, FaUserFriends } from "react-icons/fa";
import UserTab from "../../components/UserTab";
import axios from "axios";
import UserCard from "./UserCard";
import { Backdrop } from "@mui/material";

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
        className='bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 flex items-center justify-between transition duration-300 '
        onClick={toggleBox}
      >
        <span className='text-gray-800'>{followers?.length} Followers</span>
        <FaUserFriends className='text-gray-600 ml-2' />
      </div>
      {isOpen && (
        <div className=' text-black bg-white flex justify-center items-center min-w-full min-h-full'>
          <Backdrop
            className=' h-[500px] max-w-md bg-whire border-gray-300 rounded py-4'
            open={isOpen}
          >
            <button
              className='absolute top-0 right-0 mr-2 mt-2 text-white hover:text-gray-200 transition duration-300'
              onClick={toggleBox}
            >
              <FaTimes />
            </button>
            <div className='p-2 bg-slate-200 rounded-lg gap-4 flex flex-col'>
              {follower?.length > 0 && (
                <h1 className='text-gray-800 font-semibold p-2'>Followers</h1>
              )}
              {follower?.length > 0 ? (
                follower.map((user, index) => (
                  <UserTab key={index} user={user} className='border-black' />
                ))
              ) : (
                <p className='text-gray-600'>No followers yet.</p>
              )}
            </div>
          </Backdrop>
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-col'>
      <h2 className='text-2xl font-bold mb-4'>Followers</h2>
      <div className='grid grid-cols-2 gap-4'>
        {follower?.length > 0 ? (
          follower.map((user, index) => <UserCard key={index} user={user} />)
        ) : (
          <p className='text-gray-600'>No followers yet.</p>
        )}
      </div>
    </div>
  );
};

export default FollowersPanel;
