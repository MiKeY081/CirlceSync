import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditPost = () => {
  const [posts, setPosts] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    handleFetchPost();
  }, []);
  const handleFetchPost = async () => {
    try {
      const { data } = await axios.get(`/post/${id}`);
      if (data.success) {
        toast.success;
        console.log(data);
        setPosts(data.allpost);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Edit Post</h1>
      {posts && <PostForm post={posts[0]} />}
    </div>
  );
};

export default EditPost;
