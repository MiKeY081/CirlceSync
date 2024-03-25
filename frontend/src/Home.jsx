import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PostCard from "./components/PostCard";
import PostForm from "./posts/PostForm";
import { UserContext } from "./Context/UserContext";
import UserTab from "./components/UserTab";
import FollowersPanel from "./profile/Widgets/FollowersPanel";
import Posts from "./posts/Posts";

const Home = () => {
  const { user } = useContext(UserContext);

  const [followers, setFollowers] = useState();

  useEffect(() => {
    if (user) {
      handleGetFollowers();
    }
  }, [user]);

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
    <div className='container mx-auto mt-8 flex justify-center min-h-screen'>
      <div className='w-1/4 mr-4'>
        {/* Left-sided div */}
        <div className='bg-gray-100 p-4 rounded-md'>
          <UserTab user={user} />
          <FollowersPanel followers={followers} />
        </div>
      </div>

      <div className='w-1/2'>
        <Posts />
      </div>

      <div className='w-1/4 ml-4'>
        {/* Right-sided div */}
        <div className='bg-gray-100 p-4 rounded-md'>
          <h2 className='text-xl font-semibold mb-4'>Right Sided Div</h2>
          {/* Add content for right-sided div here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
