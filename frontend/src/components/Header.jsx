import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { SearchContext } from "../Context/SearchContext";
import UserTab from "./UserTab";
import { Link } from "react-router-dom";
import UserItems from "../assets/Widgets/UserItems";
import NotificationDropdown from "./NotificationDropdown";

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
      </div>
      <div className='flex justify-start items-center gap-2'>
        <input
          id='search'
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=' px-3 py-1 rounded-md bg-gray-700 text-white  focus:outline-none focus:bg-gray-900 transition duration-300'
        />
        <label
          htmlFor='search'
          className='mr-4 transition duration-300 hover:text-gray-300 flex justify-center '
        >
          <RiSearchLine className='h-6 w-6' />
        </label>
      </div>
      <div className='flex items-center'>
        <NotificationDropdown className=' mr-4 transition duration-300 hover:text-gray-300' />
        <UserItems />
      </div>
      {search && searchedUser && (
        <div className='absolute top-full left-[500px] bg-gray-50 w-[400px] p-4 rounded-md shadow-md z-10'>
          {searchedUser && (
            <div className=''>
              {searchedUser.map((user) => (
                <div key={user.id} className='flex items-center gap-4 bg-white'>
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
