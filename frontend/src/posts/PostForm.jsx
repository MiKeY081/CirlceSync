import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { handleImageUpload } from "../assets/Functions/ImageHandler";
import CreatePostTouch from "./Widget/CreatePostTouch";

const PostForm = ({ post, placeholder }) => {
  const [caption, setCaption] = useState(post?.caption || "");
  const [images, setImages] = useState(post?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(post?.id ? true : false);
  const id = post?.id || "";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      await handleCreatePost();
    } else {
      await handleEditPost();
    }
    setCaption("");
    setImages("");
    togglePopover();
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

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className='min-w-full'>
      {!post?.id && (
        <div
          className='w-full mx-auto  z-10 cursor-pointer'
          onClick={(e) => togglePopover(e)}
        >
          <CreatePostTouch placeholder={placeholder} />
        </div>
      )}
      {isPopoverOpen && (
        <div className='absolute min-w-[500px] py-10 mx-auto flex justify-center items-center z-20'>
          <div className='relative bg-white border border-gray-300 rounded shadow-lg  p-10 w-full h-full'>
            <FaTimes
              className='absolute top-0 right-0 m-2 text-gray-500 cursor-pointer hover:text-gray-700'
              onClick={togglePopover}
            />
            <form className='w-full h-full' onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='caption'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Caption
                </label>
                <input
                  type='text'
                  id='caption'
                  value={caption}
                  placeholder={
                    placeholder ? placeholder : "What's on your mind!"
                  }
                  onChange={(e) => setCaption(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='image'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Image Upload
                </label>
                <div className='flex items-center'>
                  <input
                    type='file'
                    id='image'
                    onChange={(e) =>
                      handleImageUpload(e, setIsLoading, setImages)
                    }
                    className='hidden'
                    accept='image/*'
                  />
                  <label
                    htmlFor='image'
                    className='cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center'
                  >
                    <FiImage className='mr-2' /> Upload Image
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
