import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import PostOwnerTab from "./PostOwnerTab";
import CreatePostTouch from "../posts/Widget/CreatePostTouch";
import Comments from "../posts/Comments";

const PostCard = ({ post, setPosts }) => {
  const [owner, setOwner] = useState();
  const { user } = useContext(UserContext);
  const [isLoved, setIsLoved] = useState(false);

  const getUser = async () => {
    try {
      const id = post?.userId;
      if (id) {
        const { data } = await axios.get(`user/getuser/${id}`);
        if (data.success) {
          setOwner(data.user);
        } else {
          toast.error(data.message);
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
      if (user?.id) {
        const { data } = await axios.post("/post/like/" + id);

        if (data.message == "Liked successfully") {
          setPosts((prev) =>
            prev.map((post) =>
              post.id == id
                ? {
                    ...post,
                    likedBy: [...post.likedBy, user?.id],
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
                    likedBy: post.likedBy.filter(
                      (userId) => userId !== user?.id
                    ),
                  }
                : post
            )
          );
        }
      }
      // Toggle the isLoved state
    } catch (error) {
      console.error("Error while sending like:", error);
    }
  };

  const handleShare = (id) => {
    console.log("Share", id);
  };

  return (
    post && (
      <div className='relative group w-5/6 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 mb-6 px-4'>
        <PostOwnerTab owner={owner} post={post} setPosts={setPosts} />
        {post.caption && (
          <h3 className='text-lg font-medium text-gray-900 my-3'>
            {post?.caption}
          </h3>
        )}
        {post.images[0] && (
          <div className='w-full h-96 object-cover rounded-t-lg group-hover:rounded-lg hover:rounded-lg transition-all duration-300 overflow-hidden'>
            <img
              className='h-96 w-full overflow-hidden hover:scale-105 rounded-lg hover-rounded-lg transition-all duration-200 
            '
              src={post.images[0]}
              alt={post.caption || "No images"}
              onClick={() => gotoPost(post.id)}
            />
          </div>
        )}
        <div className='p-4 bg-white rounded-b-lg group-hover:bg-gray-50'>
          <div className='flex gap-3 justify-between items-center w-full'>
            <div className='flex gap-2 '>
              <FaHeart
                onClick={() => {
                  if (!user?.name) {
                    setIsLoved(!isLoved);
                  }
                  handleLove(post.id);
                }}
                fill={
                  user?.id
                    ? post?.likedBy?.includes(user?.id)
                      ? "red"
                      : "darkslategray"
                    : isLoved
                    ? "red"
                    : "darkslategray"
                }
                size={25}
                style={{ cursor: "pointer" }}
              />
              <span className=''>
                {" "}
                {post?.likedBy?.length == 0 ? "" : post?.likedBy?.length}{" "}
              </span>
            </div>
            <label htmlFor={post?.id} className='cursor-pointer'>
              <FaComment
                size={25}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </label>

            <FaShare
              onClick={() => handleShare(post.id)} // Implement handleShare function
              size={25}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </div>
        </div>
        <div className='py-3'>
          <Comments post={post} />
        </div>
      </div>
    )
  );
};

export default PostCard;
