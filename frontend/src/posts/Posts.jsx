import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import CreatePostTouch from "./Widget/CreatePostTouch";

const Posts = () => {
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
    <div className='container mx-auto mt-8 flex justify-center min-h-screen'>
      <div className='w-1/4 mr-4'>
        {/* Left-sided div */}
        <div className='bg-gray-100 p-4 rounded-md'>
          <h2 className='text-xl font-semibold mb-4'>Left Sided Div</h2>
          {/* Add content for left-sided div here */}
        </div>
      </div>

      <div className='w-1/2'>
        <CreatePostTouch />
        {loading && <p className='text-center'>Loading...</p>}
        {!loading && posts.length === 0 && (
          <p className='text-center'>No posts found.</p>
        )}
        <div className='flex flex-col justify-center items-center'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} setPosts={setPosts} />
          ))}
        </div>
      </div>

      <div className='w-1/4 ml-4'>
        {/* Right-sided div */}
        <div className='bg-gray-100 p-4 rounded-md'>
          <h2 className='text-xl font-semibold mb-4'>Right Sided Div</h2>
          {/* Add content for right-sided div here */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
