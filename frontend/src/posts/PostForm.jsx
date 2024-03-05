import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = ({ post }) => {
  const [caption, setCaption] = useState(post?.caption || "");
  const [image, setImage] = useState(post?.image || "");
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      handleCreatePost(caption, image);
    } else {
      handleEditPost(id, caption, image);
    }
  };
  const handleCreatePost = async () => {
    try {
      const { data } = await axios.post("/post/create", { caption, image });
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
        image,
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
          type='text'
          id='image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
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
