import React, { useContext } from "react";
import { FaEdit, FaPenFancy } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Follow from "./Follow";
import FollowersPanel from "./FollowersPanel";

const UserInfo = ({ owner, followers, setFollowers }) => {
  const paramId = useParams();
  const joinedDate = new Date(owner?.createdAt);
  const { user } = useContext(UserContext);

  return (
    owner && (
      <div className='flex justify-center items-center bg-gray-100 min-w-full'>
        <div className='min-w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden'>
          <div className=' flex justify-center overflow-hidden relative lg:px-10 py-2'>
            <img
              className='lg:max-h-[400px] md:max-h-96 w-full min-h-80  object-cover  rounded-lg overflow-hidden'
              src={owner.coverImage ? owner.coverImage : owner.image}
              alt='Profile'
            />
          </div>
          <div className='relative md:-top-20 -top-16 lg:left-20 left-10 lg:size-48 md:size-44 size-32 rounded-full  p-4 bg-blue-600 inline-block'>
            <img
              className='rounded-full object-cover  h-full w-full'
              src={owner.image}
              alt='Profile'
            />
          </div>
          <div className=' lg:px-6 px-2 flex md:flex-row flex-col justify-between relative lg:-top-40 -top-16'>
            <div></div>
            <div className='flex flex-col px-4'>
              <h1 className='text-2xl font-semibold capitalize'>
                {owner.name}
              </h1>
              {owner.slang && (
                <div className='flex flex-row justify-start items-center gap-4'>
                  <FaPenFancy />
                  <p className='text-xl font-semibold'>
                    {owner.slang.charAt(0).toUpperCase() + owner.slang.slice(1)}
                  </p>
                </div>
              )}
            </div>
            <div className='flex justify-between px-2 py-2 gap-4 mt-2'>
              <FollowersPanel followers={followers} />
              {!paramId?.id || paramId?.id == user?.id ? (
                <Link
                  to={"/profile/edit"}
                  className='[&>*]:dark:bg-blue-500 dark:bg-blue-500 [&>*]:dark:hover:bg-blue-600 dark:hover:bg-blue-600 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center whitespace-nowrap '
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
        </div>
      </div>
    )
  );
};

export default UserInfo;
