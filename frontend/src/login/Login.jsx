import React from "react";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-6'>Login</h1>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center border rounded-md px-4 py-2'>
          <RiMailLine className='mr-2' />
          <input
            type='email'
            placeholder='Email'
            className='outline-none flex-grow'
          />
        </div>
        <div className='flex items-center border rounded-md px-4 py-2'>
          <RiLockPasswordLine className='mr-2' />
          <input
            type='password'
            placeholder='Password'
            className='outline-none flex-grow'
          />
        </div>
        <button className='bg-blue-500 text-white rounded-md px-4 py-2'>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
