import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { UserContext } from "../Context/UserContext";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [posts, setPosts] = useState();

  const { user } = useContext(UserContext);
  console.log(user?.Post);

  return (
    user && (
      <div className='flex flex-col items-center justify-center bg-gray-100'>
        <div className='max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='flex items-center justify-center bg-blue-500 h-32'>
            <img
              className='h-24 w-24 rounded-full object-cover'
              src={user.image}
              alt='Profile'
            />
          </div>
          <div className='py-4 px-6'>
            <h1 className='text-2xl font-semibold'>{user.name}</h1>
            <p className='text-gray-600'>john.doe@example.com</p>
          </div>
          {user?.Post &&
            user?.Post.map((post, index) => (
              <div
                key={index}
                className='flex flex-col items-center justify-center gap-20'
              >
                <PostCard key={index} post={post} />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Profile;
