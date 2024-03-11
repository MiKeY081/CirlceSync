import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { RiUserFill } from "react-icons/ri"; // Example icon from react-icons library
import { toast } from "react-toastify";
import { app } from "../config/firebase";
import axios from "axios";

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [isLoading, setIsLoading] = useState(false);
  // Add more state variables for other fields if needed

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile();
  };
  // const convertDateFormat = (e) => {
  //   // Check if a date is selected
  //   console.log(dob);
  //   // Convert the selected date to a JavaScript Date object
  //   const jsDate = new Date(dob);

  //   // Format the date to match the datetime format in your database (ISO-8601)
  //   const formattedDate = jsDate
  //     .toLocaleString()
  //     .slice(0, 19)
  //     .replace("T", " ");
  //   console.log(formattedDate);
  //   // Update the state with the formatted date
  //   setDob(formattedDate);
  // };

  const handleEditProfile = async () => {
    try {
      const { data } = await axios.put(`/user/update`, {
        name,
        email,
        image,
        phone,
        address,
        dob,
      });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    try {
      toast.success("Uploading...");
      for (let i = 0; i < e.target.files.length; i++) {
        console.log(i);
        const fbimage = e.target.files[i];
        const storage = getStorage(app);
        const fileName = new Date().getTime() + fbimage.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, fbimage);

        // Listen for state changes (including errors)
        uploadTask.on("state_changed", (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          console.log("prgress is", progress);

          if (snapshot.error) {
            console.error(snapshot.error.message);
            toast.error("Image upload failed. Try again");
          }
        });

        // Wait for the upload to complete before getting the URL
        await uploadTask;

        // Now it's safe to call getDownloadURL
        const imageUrl = await getDownloadURL(storageRef);

        console.log(imageUrl);
        // Update image list with new URL
        setImage((prev) => [...prev, imageUrl]);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Image upload failed. Try again");
    } finally {
      setIsLoading(false);
    }
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
          <label htmlFor='phone' className='block mb-2'>
            Phone
          </label>
          <input
            type='text'
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
