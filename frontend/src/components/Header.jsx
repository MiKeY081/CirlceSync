import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { SearchContext } from "../Context/SearchContext";
import UserTab from "./UserTab";

const Header = () => {
  const [search, setSearch] = useState("");
  const { user } = useContext(SearchContext);

  const searchedUser = user?.filter((user) => {
    if (search) return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <nav className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='flex items-center'>
        <img src='logo.png' alt='Logo' className='w-18 h-12 p-0' />
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='ml-4 px-2 py-1 rounded-md bg-gray-700 text-white text-center'
        />
      </div>
      <div className='flex items-center'>
        <div className='mr-4'>
          <RiSearchLine className='h-6 w-6' />
        </div>
        <AiOutlineBell className='w-6 h-6' />
        <AiOutlineUser className='w-6 h-6 ml-4' />
      </div>
      <div className='absolute bg-gray-800 w-64 p-4 rounded-md'>
        {searchedUser && (
          <div>
            {searchedUser.map((user) => (
              <div key={user._id} className='flex items-center gap-4'>
                <UserTab user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
