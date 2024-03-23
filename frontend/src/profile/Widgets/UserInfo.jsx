import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaPhone,
  FaCalendar,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FormatedDate } from "../../assets/Functions/DateFunctions";
import { UserContext } from "../../Context/UserContext";
import Follow from "./Follow";
import FollowersPanel from "./FollowersPanel";

const UserInfo = ({ owner }) => {
  const paramId = useParams();
  const joinedDate = new Date(owner?.createdAt);
  const { user } = useContext(UserContext);

  useEffect(() => {
    handleGetFollowers(owner?.id);
  }, []);

  const [followers, setFollowers] = useState();

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

  return (
    owner && (
      <div className='flex justify-center items-center bg-gray-100 min-h-screen min-w-screen'>
        <div className='w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='bg-blue-500 py-8 flex justify-center'>
            <img
              className='h-24 w-24 rounded-full object-cover'
              src={owner.image}
              alt='Profile'
            />
          </div>
          <div className='py-4 px-6'>
            <h1 className='text-2xl font-semibold'>{owner.name}</h1>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700 flex items-center'>
              <FaEnvelope className='mr-2' />
              {owner.email}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700 flex items-center'>
              <FaUser className='mr-2' />
              {owner.address}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700 flex items-center'>
              <FaPhone className='mr-2' />
              {owner.phone}
            </p>
          </div>
          <div className='py-4 px-6'>
            <p className='text-gray-700 flex items-center'>
              <FaCalendar className='mr-2' />
              {"Joined At " + FormatedDate(joinedDate)}
            </p>
          </div>

          <div className='flex justify-between px-4 py-2 '>
            <FollowersPanel followers={followers} />

            {!paramId?.id ? (
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
                followers={followers}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfo;
