import React from "react";
import PostCard from "../components/PostCard";

const Posts = () => {
  const posts = [
    {
      caption: "First post",
      image: "https://example.com/image1.jpg",
      like: "heart",
      comment: "comment",
      share: "share",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      caption: "Second post",
      image: "https://example.com/image2.jpg",
      like: "heart",
      comment: "comment",
      share: "share",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more posts here...
  ];

  return (
    <div className='grid grid-cols-1 gap-4'>
      {posts.map((post, index) => (
        <div className='flex flex-col items-center justify-center'>
          <PostCard key={index} post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
