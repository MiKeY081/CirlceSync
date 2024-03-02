import React, { useState } from "react";
import { RiUserFill } from "react-icons/ri"; // Example icon from react-icons library

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add more state variables for other fields if needed

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-4'>Profile Form</h2>
      <form onSubmit={handleSubmit} className='w-64'>
        <div className='mb-4'>
          <label htmlFor='name' className='block mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        {/* Add more form fields here */}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
      <RiUserFill className='mt-4 text-4xl' />{" "}
      {/* Example usage of react-icons */}
    </div>
  );
};

export default ProfileForm;
