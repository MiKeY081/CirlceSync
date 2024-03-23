import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CreatePostTouch from "../posts/Widget/CreatePostTouch";
import UserInfo from "./Widgets/UserInfo";
import { useParams } from "react-router-dom";

const Profile = ({ owner }) => {
  const paramId = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (owner) {
      setPosts(owner.Post);
    }
  }, [owner]);

  return (
    owner && (
      <div className='flex justify-center items-center bg-gray-100 min-h-screen min-w-screen'>
        <div className='w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden'>
          <UserInfo owner={owner} />
          <div className='py-4 px-6'>
            <h1 className='text-xl font-semibold'>Posts</h1>
            {paramId.id ? (
              <CreatePostTouch
                placeholder={`Write something on ${owner.name}'s timeline`}
              />
            ) : (
              <CreatePostTouch placeholder='Write something on your timeline' />
            )}
          </div>
          <div className='flex flex-col gap-4 items-center'>
            {posts.length === 0 ? (
              <div className='py-4 px-6 w-full text-center'>
                <h1 className='text-lg font-semibold'>No Posts</h1>
              </div>
            ) : (
              posts.map((post, index) => (
                <PostCard key={index} post={post} setPosts={setPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
