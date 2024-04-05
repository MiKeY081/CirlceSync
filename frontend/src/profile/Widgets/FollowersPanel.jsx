import React, { useEffect, useState } from "react";
import { FaTimes, FaUserFriends } from "react-icons/fa";
import UserTab from "../../components/UserTab";
import axios from "axios";
import UserCard from "./UserCard";
import { Backdrop } from "@mui/material";
import { SyncLoader } from "react-spinners";

const FollowersPanel = ({ followers, open }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [follower, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
        className='[&>*]:dark:bg-blue-500 dark:bg-blue-500 [&>*]:dark:hover:bg-blue-600 dark:hover:bg-blue-600 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded cursor-pointer flex items-center justify-between transition duration-300 text-white dark:text-white '
        onClick={toggleBox}
      >
        <span className=' dark:text-gray-200 whitespace-nowrap'>
          {followers?.length} Followers
        </span>
        <FaUserFriends className='ml-2 ' />
      </div>
      {isOpen && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          className='relative '
          open={isOpen}
        >
          <div className='relative p-2 bg-slate-200 rounded-lg gap-4 flex flex-col px-10 py-2 min-w-96  dark:bg-gray-24 dark:text-white'>
            <button
              className='absolute top-0 right-0 mr-2 mt-2 text-black hover:text-gray-800 transition duration-300 dark:text-gray-200'
              onClick={toggleBox}
            >
              <FaTimes />
            </button>
            {follower?.length > 0 && (
              <h1 className='text-gray-800 font-semibold p-2 text-lg dark:text-gray-200'>
                Followers
              </h1>
            )}
            {isLoading ? (
              <div className='min-w-screen min-h-[50vh] flex justify-center items-center'>
                <SyncLoader color='#999999' />
              </div>
            ) : follower?.length > 0 ? (
              follower.map((user, index) => (
                <UserTab key={index} user={user} className='border-black' />
              ))
            ) : (
              <p className='text-gray-600 dark:text-gray-200'>
                No followers yet.
              </p>
            )}
          </div>
        </Backdrop>
      )}
    </div>
  ) : (
    <div className='flex flex-col  dark:bg-gray-24 dark:text-white'>
      <h2 className='text-2xl font-bold mb-4'>Followers</h2>
      <div className='grid grid-cols-2 gap-4'>
        {isLoading ? (
          <div className='min-w-screen min-h-[50vh] flex justify-center items-center'>
            <SyncLoader color='#999999' />
          </div>
        ) : follower?.length > 0 ? (
          follower.map((user, index) => <UserCard key={index} user={user} />)
        ) : (
          <p className='text-gray-600 dark:text-gray-200'>No followers yet.</p>
        )}
      </div>
    </div>
  );
};

export default FollowersPanel;
