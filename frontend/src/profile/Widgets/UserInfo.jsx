import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaPhone,
  FaCalendar,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Follow from "./Follow";
import FollowersPanel from "./FollowersPanel";
import About from "./About";

const UserInfo = ({ owner, followers, setFollowers }) => {
  const paramId = useParams();
  const joinedDate = new Date(owner?.createdAt);
  const { user } = useContext(UserContext);

  return (
    owner && (
      <div className='flex justify-center items-center bg-gray-100 min-h-screen min-w-screen'>
        <div className='min-w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden'>
          <div className=' flex justify-center overflow-hidden relative px-10 py-2'>
            <img
              className='h-[400px] w-full object-cover  rounded-lg overflow-hidden'
              src={owner.image}
              alt='Profile'
            />
          </div>
          <div className='absolute top-[450px] left-48 h-48 w-48 rounded-full  p-4 bg-green-400'>
            <img
              className='rounded-full object-cover  h-full w-full'
              src={owner.image}
              alt='Profile'
            />
          </div>
          <div className='py-4 px-6 flex justify-between'>
            <div></div>
            <h1 className='text-2xl font-semibold'>{owner.name}</h1>
            <div className='flex justify-between px-4 py-2 gap-4 '>
              <FollowersPanel followers={followers} />
              {!paramId?.id || paramId?.id == user?.id ? (
                <Link
                  to={"/profile/edit"}
                  className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center'
                >
                  <FaEdit className='mr-2' />
                  Edit Profile
                </Link>
              ) : (
                <Follow
                  followingId={owner?.id}
                  followerId={user?.id}
                  setFollowersPanel={setFollowers}
                />
              )}
            </div>
          </div>
          <About owner={owner} />
        </div>
      </div>
    )
  );
};

export default UserInfo;
