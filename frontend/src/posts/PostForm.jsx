import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { handleImageUpload } from "../assets/Functions/ImageHandler";
import CreatePostTouch from "./Widget/CreatePostTouch";
import { Backdrop } from "@mui/material";
import { RiKey2Line } from "react-icons/ri";

const PostForm = ({ post, placeholder, setPosts }) => {
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
        setPosts((prev) => [...prev, data.post]);
        navigate("/");
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
        setPosts((prev) => {
          return prev.map((post) => (post.id === id ? data.post : post));
        });
        navigate(`/`);
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
          <label htmlFor='postform'>
            <CreatePostTouch placeholder={placeholder} />
          </label>
        </div>
      )}
      {isPopoverOpen && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          className='absolute lg:min-w-[500px] lg:min-h-64 min-w-40 min-h-40 md:py-10 p-4 mx-auto flex justify-center items-center text-gray-600 z-20 m-2'
          open={isPopoverOpen}
        >
          <div className='relative bg-white border border-gray-300 rounded shadow-lg  lg:p-10 md:p-6 p-4 md:w-[500px] md:h-full min-w-40 max-w-96 '>
            <FaTimes
              className='absolute top-0 right-0 m-2 text-gray-500 cursor-pointer hover:text-gray-700'
              onClick={togglePopover}
            />
            <form className='w-full h-full items' onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='caption'
                  className='block text-gray-700 font-bold mb-2 '
                >
                  Caption
                </label>
                <input
                  type='text'
                  id='postform'
                  value={caption}
                  placeholder={
                    placeholder ? placeholder : "What's on your mind!"
                  }
                  onChange={(e) => setCaption(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='image'
                  className='block text-gray-700 font-bold mb-2 whitespace-nowrap'
                >
                  Image Upload
                </label>
                <div className='flex flex-col justify-center w-1/2'>
                  <input
                    type='file'
                    id='image'
                    onChange={(e) =>
                      handleImageUpload(e, setIsLoading, setImages)
                    }
                    className='hidden'
                    accept='image/*'
                  />
                  {images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt='image'
                      className='min-w-15 min-h-30 object-cover rounded-lg inline-block p-2 '
                    />
                  ))}
                  <label
                    htmlFor='image'
                    className='cursor-pointer dark:bg-blue-700 bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md inline-flex items-center'
                  >
                    <FiImage className='mr-2 dark:bg-blue-700 bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-800' />{" "}
                    <span className='dark:bg-blue-700 bg-blue-700 hover:bg-blue-800'>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='dark:bg-blue-700 dark:hover:bg-blue-800 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded '
              >
                Submit
              </button>
            </form>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default PostForm;
