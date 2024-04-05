import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import PostForm from "../posts/PostForm";
import axios from "axios";

const UserPosts = ({ owner }) => {
  const paramId = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (owner) {
      setPosts(owner?.Post);
    }
  }, [owner]);
  return (
    owner && (
      <div className='flex flex-col gap-4 md:items-start md:w-1/2 w-full'>
        <div className='py-4 px-2 lg:px-6'>
          <h1 className='text-xl font-semibold'>Posts</h1>
          <div className='lg:w-[500px] min-w-full'>
            {paramId.id ? (
              <PostForm
                placeholder={`Write something on ${owner.name}'s timeline`}
              />
            ) : (
              <PostForm placeholder='Write something on your timeline' />
            )}
          </div>
        </div>
        {posts.length === 0 ? (
          <div className='py-4  px-2 lg:px-6 w-full text-center'>
            <h1 className='text-lg font-semibold'>No Posts</h1>
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard key={index} post={post} setPosts={setPosts} />
          ))
        )}
      </div>
    )
  );
};

export default UserPosts;
