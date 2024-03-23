import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import PostOwnerTab from "./PostOwnerTab";

const PostCard = ({ post, setPosts }) => {
  const [owner, setOwner] = useState();
  const { user } = useContext(UserContext);

  const getUser = async () => {
    try {
      const id = post?.userId;
      if (id) {
        const { data } = await axios.get(`user/getuser/${id}`);
        if (data.success) {
          setOwner(data.user);
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const navigate = useNavigate();
  const gotoPost = (id) => () => {
    navigate(`/post/${id}`);
  };

  const handleLove = async (id) => {
    try {
      const { data } = await axios.post("/post/like/" + id);

      if (data.message == "Liked successfully") {
        setPosts((prev) =>
          prev.map((post) =>
            post.id == id
              ? {
                  ...post,
                  likedBy: [...post.likedBy, user.id],
                }
              : post
          )
        );
      } else {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === id
              ? {
                  ...post,
                  likedBy: post.likedBy.filter((userId) => userId !== user.id),
                }
              : post
          )
        );
      }

      // Toggle the isLoved state
    } catch (error) {
      console.error("Error while sending like:", error);
    }
  };
  const handleComment = (id) => {
    console.log("Comment", id);
  };
  const handleShare = (id) => {
    console.log("Share", id);
  };

  return (
    post && (
      <div className='relative group w-5/6 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 mb-6 px-4'>
        <PostOwnerTab user={owner} post={post} client={user} />
        <h3 className='text-lg font-medium text-gray-900 my-3'>
          {post?.caption}
        </h3>
        <div className='w-full h-96 object-cover rounded-t-lg group-hover:rounded-lg hover:rounded-lg transition-all duration-300 overflow-hidden'>
          <img
            className='h-96 w-full overflow-hidden hover:scale-105 rounded-lg hover-rounded-lg transition-all duration-200 
            '
            src={post.images[0]}
            alt={post.caption || "No images"}
            onClick={() => gotoPost(post.id)}
          />
        </div>
        <div className='p-4 bg-white rounded-b-lg group-hover:bg-gray-50'>
          <div className='flex items-center justify-between'>
            {/* Add the LoveButton component here */}
            <div className='flex gap-3 justify-center items-center'>
              <FaHeart
                onClick={() => {
                  if (!user?.name) {
                    toast.error("Login required");
                  }
                  handleLove(post.id);
                }}
                fill={
                  post?.likedBy?.includes(user?.id) ? "red" : "darkslategray"
                }
                size={25}
                style={{ cursor: "pointer" }}
              />
              <span className=''>
                {" "}
                {post?.likedBy?.length == 0 ? "" : post?.likedBy?.length}{" "}
              </span>

              <FaComment
                onClick={() => handleComment(post.id)} // Implement handleComment function
                size={25}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />

              <FaShare
                onClick={() => handleShare(post.id)} // Implement handleShare function
                size={25}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostCard;
