import React, { useEffect, useState } from "react";
import UserInfo from "./Widgets/UserInfo";
import { useParams } from "react-router-dom";
import UserPosts from "./UserPosts";
import FollowersPanel from "./Widgets/FollowersPanel";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = ({ owner }) => {
  const paramId = useParams();
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState();

  useEffect(() => {
    if (owner) {
      setPosts(owner.Post);
      handleGetFollowers();
    }
  }, [owner]);

  const handleGetFollowers = async () => {
    try {
      const id = owner?.id;
      const { data } = await axios.get(`/followers/${id}`);
      if (data.success) {
        setFollowers(data.followers);
      }
    } catch (error) {
      toast.error("Internal Server error" + error.message);
    }
  };

  return (
    owner && (
      <div className='flex justify-center items-center  min-h-screen min-w-screen'>
        <div className='min-w-full shadow-md rounded-lg overflow-hidden'>
          <UserInfo owner={owner} followers={followers} />
          <div className='flex min-h-screen min-w-screen px-20 py-8'>
            <div className='flex flex-start w-1/2 relative '>
              <FollowersPanel followers={followers} open={open} />
            </div>
            <UserPosts owner={owner} />
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
