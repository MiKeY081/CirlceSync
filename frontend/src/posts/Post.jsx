import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState();
  const { postId } = useParams();
  console.log(postId);
  useEffect(() => {
    handleFetchPost(postId);
  }, []);
  const handleFetchPost = async (id) => {
    try {
      const { data } = await axios.get(`/post/${id}`);
      if (data.success) {
        toast.success;
        setPosts(data.allpost);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {posts &&
        posts?.map((post, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center gap-20'
          >
            <PostCard key={index} post={post} />
          </div>
        ))}
    </>
  );
};

export default Post;
