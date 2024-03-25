import React, { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import PostForm from "./PostForm";
import UserTab from "../components/UserTab";
import { UserContext } from "../Context/UserContext";

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
  );
};

export default Posts;
