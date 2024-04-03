import React, { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import PostForm from "./PostForm";
import { UserContext } from "../Context/UserContext";
import { HashLoader } from "react-spinners";

const Posts = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const handleFetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/getposts");
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <PostForm className='relative' setPosts={setPosts} />
      {loading && (
        <div className='min-w-screen min-h-screen flex justify-center items-center'>
          <HashLoader color='#999999' />
        </div>
      )}
      {!loading && posts.length === 0 && (
        <p className='text-center'>No posts found.</p>
      )}
      <div className='flex flex-col justify-center items-center'>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} setPosts={setPosts} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
