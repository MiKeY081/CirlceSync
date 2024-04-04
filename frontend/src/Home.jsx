import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./Context/UserContext";
import UserTab from "./components/UserTab";
import FollowersPanel from "./profile/Widgets/FollowersPanel";
import Posts from "./posts/Posts";
import { SearchContext } from "./Context/SearchContext";
import { useNavigate } from "react-router-dom";
import Login from "./login/Login";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [user, setUser] = useState();
  const users = useContext(SearchContext);
  const [followers, setFollowers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState();
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    const handlefetchProfile = async () => {
      try {
        const { data } = await axios.get(`/user/getUser`);
        if (data.success) {
          setIsLoadingUser(true);
          setUser(data.user);
        } else {
          navigate("/user/login");
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handlefetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      handleGetFollowers();
    }
    if (users?.user && user && user?.follower) {
      const unFollowedUsers = users?.user?.filter((oneuser) => {
        return (
          user.id != oneuser.id &&
          !user?.follower.some(
            (follower) => follower.followingId === oneuser.id
          )
        );
      });
      setSuggestedUsers(unFollowedUsers.slice(0, 5));
    }
  }, [user, user?.follower]);

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

  return isLoadingUser ? (
    <div className='container mx-auto  mt-8postownertab flex flex-col md:flex-row justify-center min-h-screen  dark:bg-gray-24 dark:text-white'>
      {/* Left-sided div */}
      <div className='hidden md:block w-full md:mr-4 dark:bg-gray-24 dark:text-gray-200 bg-gray-100 rounded-md p-4 md:w-1/4'>
        <UserTab user={user} />
        <FollowersPanel followers={followers} />
      </div>

      {/* Middle div */}
      <div className='w-full md:w-3/4 lg:w-1/2 dark:bg-gray-24 text-gray-200 rounded-md'>
        <Posts />
      </div>

      {/* Right-sided div */}
      <div className='hidden lg:block md:w-1/4 ml-4 dark:bg-gray-24 dark:text-gray-200 bg-gray-100 rounded-md p-4 md:h-auto'>
        <h2 className='text-xl font-semibold mb-4'>Suggested for you</h2>
        <div className='grid grid-cols-1 gap-4 overflow-auto'>
          {suggestedUsers?.map((user) => (
            <UserTab key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen min-w-screen flex items-center justify-center '>
      <HashLoader color='#999999' />
    </div>
  );
};

export default Home;
