import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PostCard from "./components/PostCard";
import PostForm from "./posts/PostForm";
import { UserContext } from "./Context/UserContext";
import UserTab from "./components/UserTab";
import FollowersPanel from "./profile/Widgets/FollowersPanel";
import Posts from "./posts/Posts";
import { SearchContext } from "./Context/SearchContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const users = useContext(SearchContext);
  const [followers, setFollowers] = useState([]);

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
      {/* Left-sided div */}
      <div className='w-1/4 mr-4 bg-gray-100 rounded-md p-4 min-h-[500px]'>
        <UserTab user={user} />
        <FollowersPanel followers={followers} />
      </div>

      {/* Middle div */}
      <div className='w-1/2'>
        <Posts />
      </div>

      {/* Right-sided div */}
      <div className='w-1/4 ml-4 bg-gray-100 rounded-md p-4 h-[500px]'>
        <h2 className='text-xl font-semibold mb-4'>Suggested for you</h2>
        <div className='grid grid-cols-1 gap-4 h-[400px] overflow-hidden'>
          {users?.user?.map((user) => (
            <UserTab key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
