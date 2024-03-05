import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

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
  console.log(posts);
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

export default Posts;
