import React, { useState } from "react";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { handleLogin } from "../Api/ApiReqest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex items-center border rounded-md px-4 py-2'>
          <RiLockPasswordLine className='mr-2' />
          <input
            type='password'
            placeholder='Password'
            className='outline-none flex-grow'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-between '>
          <button
            className='bg-blue-500 text-white rounded-md px-4 py-2'
            onClick={() => handleLogin(email, password)}
          >
            Sign In
          </button>
          <Link to={"/user/register"} className='text-blue-500  '>
            <span className='text-xs'>Don't have an account?</span>
            <br /> <span className='flex justify-end'>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
