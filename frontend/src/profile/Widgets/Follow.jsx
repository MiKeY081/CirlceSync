import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Follow = ({ followerId, followingId, setFollowersPanel }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const [followers, setFollowers] = useState();

  useEffect(() => {
    handleGetFollowers(followingId);
  }, []);
  useEffect(() => {
    const isFollower = followers?.some((obj) => obj.followerId === followerId);
    setIsFollowing(isFollower);
  }, [followers, followerId]);

  const handleGetFollowers = async (id) => {
    try {
      const { data } = await axios.get(`/followers/${id}`);
      if (data.success) {
        setFollowers(data.followers);
      }
    } catch (error) {
      toast.error("Internal Server error" + error.message);
    }
  };

  const handleFollow = async () => {
    try {
      setIsFollowing(true);
      const { data } = await axios.post("/follow", {
        followerId,
        followingId,
      });
      if (data.success) {
        toast.success("Followed");
        if (setFollowersPanel) {
          setFollowersPanel((prev) => [...prev, data.follow]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!" + error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowing(false);
      const { data } = await axios.delete("/unfollow", {
        data: {
          followerId,
          followingId,
        },
      });
      if (data.success) {
        toast.success("Unfollowed");
        if (setFollowersPanel) {
          setFollowersPanel((prev) =>
            prev.filter((obj) => obj.followerId !== followerId)
          );
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!" + error.message);
    }
  };

  return (
    <div className='flex dark:bg-gray-36'>
      {isFollowing ? (
        <button
          className=' hover:bg-red-600 text-red-600 [&>*]:dark:hover:bg-red-600 hover:text-white font-bold py-2 px-4 flex justify-center items-center rounded-full border-red-600 border-2'
          onClick={handleUnfollow}
        >
          <FaUserMinus className='mr-2 inline-block' />
          Unfollow
        </button>
      ) : (
        <button
          className='hover:bg-green-600 text-green-600 [&>*]:dark:hover:bg-green-600 hover:text-white font-bold py-2 px-4 flex justify-center items-center rounded-full border-green-600 border-2'
          onClick={handleFollow}
        >
          <FaUserPlus className='mr-2 inline-block' />
          Follow
        </button>
      )}
    </div>
  );
};

export default Follow;
