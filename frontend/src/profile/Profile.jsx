import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaPhone,
  FaCalendar,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { FormatedDate } from "../assets/Functions/DateFunctions";
import CreatePostTouch from "../posts/Widget/CreatePostTouch";

const Profile = ({ user }) => {
  const paramId = useParams();
  const joinedDate = new Date(user?.createdAt);
  const [post, setPost] = useState();
  useEffect(() => {
    setPost(user?.Post);
  }, []);

  return (
    user && (
      <div className='flex justify-center items-center bg-gray-100 min-h-screen min-w-screen'>
        <div className='min-w-2/3 bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='flex items-center justify-center bg-blue-500 h-32'>
            <img
              className='h-24 w-24 rounded-full object-cover'
              src={user.image}
              alt='Profile'
            />
          </div>
          <div className='py-4 px-6'>
            <h1 className='text-2xl font-semibold'>{user.name}</h1>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700'>
              <FaEnvelope className='inline mr-2' />
              {user.email}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700'>
              <FaUser className='inline mr-2' />
              {user.address}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700'>
              <FaPhone className='inline mr-2' />
              {user.phone}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700'>
              <FaCalendar className='inline mr-2' />
              {"Joined At " + FormatedDate(joinedDate)}
            </p>
          </div>
          {!paramId?.id ? (
            <Link
              to={"/profile/edit"}
              className='block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 text-center'
            >
              <FaEdit className='inline mr-2' />
              Edit Profile
            </Link>
          ) : (
            <hr />
          )}
          {!post?.length ? (
            <div className='py-4 px-6 w-full'>
              <h1 className='text-xl font-semibold'>No Posts</h1>
              {paramId.id ? (
                <CreatePostTouch
                  placeholder={`Write something on ${user.name} timeline  `}
                />
              ) : (
                <CreatePostTouch
                  placeholder={`Write something on your timeline  `}
                />
              )}
            </div>
          ) : (
            <div className='py-4 px-6'>
              <h1 className='text-xl font-semibold'>Posts</h1>
              {paramId.id ? (
                <CreatePostTouch
                  placeholder={`Write something on ${user.name} timeline  `}
                />
              ) : (
                <CreatePostTouch
                  placeholder={`Write something on your timeline  `}
                />
              )}
            </div>
          )}
          <div className='flex flex-col gap-4 items-center'>
            {post?.map((post, index) => (
              <PostCard key={index} post={post} setPosts={setPost} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
