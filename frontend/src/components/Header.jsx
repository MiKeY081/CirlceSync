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
    <nav className='flex items-center justify-between px-4 py-2 dark:bg-gray-58 text-white relative '>
      <div className='flex items-center dark:text-white'>
        <Link to={"/"} className=''>
          <img
            src='logo.png'
            alt='Logo'
            className='w-18 h-12 p-0 dark:bg-gray-58'
          />
        </Link>
      </div>

      <div className='flex items-center flex-grow justify-center md:justify-start gap-2 dark:text-gray-300 dark:bg-gray-58 md:ml-4'>
        <input
          id='search'
          type='text'
          placeholder='Search Your Friends'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='px-3 py-1 rounded-md  dark:text-white text-black focus:outline-yellow-100 dark:outline-none dark:focus:bg-gray-60 transition duration-300 outline-1 dark:bg-gray-60'
        />
        <label
          htmlFor='search'
          className='mr-4 transition duration-300 hover:text-gray-300 flex justify-center dark:text-gray-300 dark:hover:text-gray-200'
        >
          <RiSearchLine className='h-6 w-6 dark:bg-gray-58 text-gray-800' />
        </label>
      </div>

      <div className='flex items-center dark:text-white [&>*]:dark:bg-gray-58 dark:bg-gray-58 gap-8'>
        <NotificationDropdown className='mr-4 transition duration-300' />
        <UserItems />
      </div>

      {search && searchedUser && (
        <div className='absolute top-full left-[500px] dark:bg-gray-24  bg-gray-500 w-[400px] p-4 rounded-md shadow-md z-10'>
          {searchedUser.map((user) => (
            <div
              key={user.id}
              className='flex items-center gap-4 bg-white dark:bg-gray-24'
            >
              <UserTab user={user} />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
