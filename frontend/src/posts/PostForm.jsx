import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../config/firebase";

const PostForm = ({ post }) => {
  const [caption, setCaption] = useState(post?.caption || "");
  const [images, setImages] = useState(post?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      handleCreatePost(caption, images);
    } else {
      handleEditPost(id, caption, images);
    }
  };
  const handleCreatePost = async () => {
    try {
      const { data } = await axios.post("/post/create", { caption, images });
      if (data.success) {
        toast.success(data.message);
        navigate("/posts");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditPost = async () => {
    try {
      const { data } = await axios.put(`/post/update/${id}`, {
        caption,
        images,
        id,
      });
      if (data.success) {
        toast.success(data.message);
        navigate(`/posts`);
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
        const image = e.target.files[i];
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

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
        setImages((prev) => [...prev, imageUrl]);
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
    <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
      <div className='mb-4'>
        <label htmlFor='caption' className='block text-gray-700 font-bold mb-2'>
          Caption
        </label>
        <input
          type='text'
          id='caption'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='image' className='block text-gray-700 font-bold mb-2'>
          Image URL
        </label>
        <input
          type='file'
          id='image'
          onChange={(e) => handleImageUpload(e)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          accept='image/*'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
