import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Follow = ({ followerId, followingId }) => {
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
      const { data } = await axios.post("/follow", {
        followerId,
        followingId,
      });
      if (data.success) {
        setIsFollowing(true);
        toast.success("Followed");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!" + error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await axios.delete("/unfollow", {
        data: {
          followerId,
          followingId,
        },
      });
      if (data.success) {
        setIsFollowing(false);
        toast.success("Unfollowed");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!" + error.message);
    }
  };

  return (
    <div className='flex '>
      {isFollowing ? (
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex justify-center'
          onClick={handleUnfollow}
        >
          <FaUserMinus className='mr-2 inline-block' />
          Unfollow
        </button>
      ) : (
        <button
          className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex justify-center'
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
