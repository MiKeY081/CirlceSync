import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // UserAvatar using React Icons
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";

const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};

const UserTab = ({ user }) => {
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };
  return (
    user && (
      <div className='flex items-center justify-between cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-700 hover:rounded transition duration-300 ease-in- w-full'>
        <div
          className='flex items-center'
          onClick={() => handleClick(user?.id)}
        >
          <div className='mr-4 gap-4'>
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
              <h4 className='text-md font-semibold text-white mb-1'>
                {user.name}
              </h4>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserTab;
