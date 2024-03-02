import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleRegister } from "../Api/ApiReqest";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
      <div className='w-64'>
        <div className='flex items-center border-b border-gray-500 py-2'>
          <FaUser className='mr-2' />
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            className='w-full bg-transparent outline-none'
          />
        </div>
        <div className='flex items-center border-b border-gray-500 py-2 mt-4'>
          <FaEnvelope className='mr-2' />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='w-full bg-transparent outline-none'
          />
        </div>
        <div className='flex items-center border-b border-gray-500 py-2 mt-4'>
          <FaLock className='mr-2' />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='w-full bg-transparent outline-none'
          />
        </div>
        <div className='flex justify-between'>
          <button
            onClick={() => handleRegister(name, email, password)}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded'
          >
            Register
          </button>
          <Link to={"/user/login"} className='text-blue-600'>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
