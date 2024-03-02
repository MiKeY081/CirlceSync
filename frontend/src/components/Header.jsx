import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";

const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='flex items-center'>
        <img src='logo.png' alt='Logo' className='w-18 h-12 p-0' />
        <input
          type='text'
          placeholder='Search'
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
    </header>
  );
};

export default Header;
