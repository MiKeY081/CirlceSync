import React, { useState } from "react";
import { RiUserFill } from "react-icons/ri"; // Example icon from react-icons library
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSingleImageUpload } from "../assets/Functions/ImageHandler";

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [slang, setSlang] = useState(user?.slang || "");
  const [image, setImage] = useState(user?.image || "");
  const [coverImage, setCoverImage] = useState(user?.coverimage || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Add more state variables for other fields if needed

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile();
  };

  const handleEditProfile = async () => {
    try {
      const { data } = await axios.put(`/user/update`, {
        name,
        email,
        slang,
        image,
        coverImage,
        phone,
        address,
      });
      if (data.success) {
        toast.success(data.message);
        navigate(`/profile/${user?.id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    await handleSingleImageUpload(e, setIsLoading, setImage);
  };

  const handleCoverImageUpload = async (e) => {
    await handleSingleImageUpload(e, setIsLoading, setCoverImage);
  };

  return (
    <div className='flex flex-col items-center min-h-screen'>
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
          <label htmlFor='name' className='block mb-2'>
            Slang
          </label>
          <input
            type='text'
            id='name'
            value={slang}
            onChange={(e) => setSlang(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block mb-2'>
            Image
          </label>
          <input
            type='file'
            id='image'
            onChange={(e) => handleImageUpload(e)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block mb-2'>
            Cover Image
          </label>
          <input
            type='file'
            id='image'
            onChange={(e) => handleCoverImageUpload(e)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='phone' className='block mb-2'>
            Phone
          </label>
          <input
            type='number'
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='address' className='block mb-2'>
            Address
          </label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        {/* <div className='mb-4'>
          <label htmlFor='dob' className='block mb-2'>
            Date of Birth
          </label>
          <input
            type='date'
            id='dob'
            value={dob}
            onChange={(e) => convertDateFormat(e)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div> */}

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
