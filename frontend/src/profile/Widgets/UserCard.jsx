import React, { useContext, useEffect, useState } from "react";
import Follow from "./Follow";
import { FaUserCircle, FaHeart, FaUserFriends } from "react-icons/fa"; // Importing additional icons
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserAvatar = () => {
  return (
    <FaUserCircle className=' text-gray-500 text-4xl w-full h-full text-center ' />
  );
};

const UserCard = ({ user }) => {
  const client = useContext(UserContext);
  const [followers, setFollowers] = useState();

  useEffect(() => {
    handleGetFollowers();
  }, []);

  const handleGetFollowers = async () => {
    try {
      const id = user?.id;
      const { data } = await axios.get(`/followers/${id}`);
      if (data.success) {
        setFollowers(data.followers);
      }
    } catch (error) {
      toast.error("Internal Server error" + error.message);
    }
  };

  return (
    user && (
      <div className='bg-white shadow-lg rounded-lg overflow-hidden justify-center items-center dark:bg-gray-36 [&>*]:dark:bg-gray-58 px-4 pt-4 pb-2 mr-2 '>
        <div className='gap-4 min-w-20'>
          {user?.image ? (
            <img
              className='rounded-sm  min-w-20 object-cover object-center'
              src={user.image}
              alt='User Avatar'
            />
          ) : (
            <UserAvatar />
          )}
        </div>
        <div className='p-4'>
          <h3 className='text-gray-800 font-semibold text-xl dark:bg-gray-58'>
            {user.name}
          </h3>
          <div className='flex items-center justify-between mt-2 dark:bg-gray-58 '>
            {!(client?.user?.id == user?.id) && (
              <Follow followerId={client?.user?.id} followingId={user?.id} />
            )}
            <div className='flex gap-3 justify-center items-center dark:bg-gray-58 [&>*]:dark:bg-gray-58'>
              {followers && (
                <span>{followers?.length ? followers?.length : ""}</span>
              )}
              <FaUserFriends className='text-xl' />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
