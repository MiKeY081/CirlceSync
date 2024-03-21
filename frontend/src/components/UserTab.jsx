import React, { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // UserAvatar using React Icons
import { useNavigate } from "react-router-dom";
import { calculateDateTime } from "../assets/Functions/DateFunctions";

const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};

const UserTab = ({ user, post }) => {
  const [revealDate, setRevealDate] = useState();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/profile/${id}`);
  };
  const createdDate = new Date(post?.createdAt);

  // if ((createdDate - currentDate) > 1) {
  //   const formattedDate = new Intl.DateTimeFormat("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   }).format(date);
  //   setRevealDate(formattedDate)
  // } elseif((createdDate.getMonth() - currentDate.getMonth())>1){
  //   const formattedDate = new Intl.DateTimeFormat("en-US", {
  //     month: "long",
  //     day: "numeric",
  //   }).format(date);
  //   setRevealDate(formattedDate)
  // } elseif((createdDate.getDay() - currentDate.getDay()) > 5){

  //   setRevealDate((createdDate.getDay() - currentDate.getDay())+ "days ago at" +createdDate.getTime())
  // }
  // } elseif((createdDate.getDay() - currentDate.getDay()) < 1){

  //   setRevealDate(( createdDate.getTime()- currentDate.getTime())+ "ago")
  // }

  useEffect(() => {
    const revealDate = calculateDateTime(createdDate);
    setRevealDate(revealDate);
  }, []);
  console.log(revealDate);

  return (
    <div
      className='flex items-center justify-between cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out'
      onClick={() => handleClick(user?.id)}
    >
      <div className='flex items-center'>
        <div className='mr-4'>
          {user?.image ? (
            <img
              className='rounded-full w-10 h-10 object-cover'
              src={user.image}
              alt='User Avatar'
            />
          ) : (
            <UserAvatar />
          )}
        </div>
        <div>
          {user && (
            <div className='flex flex-col'>
              <h4 className='text-md font-semibold text-gray-800 mb-1'>
                {user.name}
              </h4>
              <p className='text-[10px] text-gray-800 font-semibold'>
                {revealDate}
              </p>
            </div>
          )}
        </div>
      </div>
      <button className='flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out'>
        <FiUserPlus className='inline mr-1' />
        Follow
      </button>
    </div>
  );
};

export default UserTab;
