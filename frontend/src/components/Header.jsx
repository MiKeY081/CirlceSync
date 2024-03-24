import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { SearchContext } from "../Context/SearchContext";
import UserTab from "./UserTab";
import { Link } from "react-router-dom";
import UserItems from "../assets/Widgets/UserItems";

const Header = () => {
  const { user, search, setSearch } = useContext(SearchContext);
  const searchedUser = user?.filter((user) => {
    if (search) return user.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <nav className='flex items-center justify-between p-4 bg-gray-800 text-white relative'>
      <div className='flex items-center'>
        <Link to={"/"}>
          {" "}
          <img src='logo.png' alt='Logo' className='w-18 h-12 p-0' />
        </Link>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='ml-4 px-2 py-1 rounded-md bg-gray-700 text-white text-center focus:outline-none focus:bg-gray-900 transition duration-300'
        />
      </div>
      <div className='flex items-center'>
        <div className='mr-4 transition duration-300 hover:text-gray-300'>
          <RiSearchLine className='h-6 w-6' />
        </div>
        <AiOutlineBell className='w-6 h-6 mr-4 transition duration-300 hover:text-gray-300' />
        <UserItems />
      </div>
      {search && searchedUser && (
        <div className='absolute top-full left-24 bg-gray-800 w-fit p-4 rounded-md shadow-md'>
          {searchedUser && (
            <div>
              {searchedUser.map((user) => (
                <div key={user.id} className='flex items-center gap-4'>
                  <UserTab user={user} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
