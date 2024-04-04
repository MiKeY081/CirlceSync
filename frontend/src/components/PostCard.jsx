import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import PostOwnerTab from "./PostOwnerTab";
import Comments from "../posts/Comments";

const PostCard = ({ post, setPosts, comment }) => {
  const [owner, setOwner] = useState();
  const { user } = useContext(UserContext);
  const [isLoved, setIsLoved] = useState(false);
  const [showMoreCaption, setShowMoreCaption] = useState(false);
  const navigate = useNavigate();
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
      <div className='relative group w-full rounded-lg overflow-hidden shadow-md  dark:bg-gray-36 dark:text-white bg-white hover:shadow-lg transition-all duration-300 mt-4 px-4 group-dark:bg-gray-36'>
        <PostOwnerTab
          owner={owner}
          post={post}
          setPosts={setPosts}
          className='mb-3'
        />
        {post.caption && (
          <div className='text-lg font-medium capitalize text-black dark:bg-gray-36 dark:text-white my-2 ml-4'>
            {post?.caption.length < 100 ? (
              <span className='dark:bg-gray-36'>{post?.caption}</span>
            ) : (
              <div>
                <span>{post.caption.slice(0, 100)}</span>
                <span
                  onClick={() => setShowMoreCaption(!showMoreCaption)} // Toggle showMoreCaption
                  className='cursor-pointer text-blue-500'
                >
                  {showMoreCaption ? " Show less..." : " Show more..."}
                </span>
              </div>
            )}
          </div>
        )}

        {post.images[0] && (
          <div className='relative group w-full rounded-lg overflow-hidden shadow-md bg-gray-36 text-white dark:bg-gray-36 dark:text-white hover:shadow-lg transition-all duration-300 mt-4 px-4 group-dark:bg-gray-36 '>
            <img
              className='h-96 w-full overflow-hidden hover:scale-105 rounded-lg hover-rounded-lg transition-all duration-200 
            '
              src={post.images[0]}
              alt={post.caption || "No images"}
              onClick={() => gotoPost(post.id)}
            />
          </div>
        )}
        <div className='p-3 my-2 dark:bg-gray-36 border-y-2 border-gray-400'>
          <div className='flex gap-3 justify-between items-center w-full dark:bg-gray-36 '>
            <div className='flex gap-2 dark:bg-gray-36'>
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
                className='dark:bg-gray-36'
              />
              <span className='dark:bg-gray-36'>
                {" "}
                {post?.likedBy?.length == 0 ? "" : post?.likedBy?.length}{" "}
              </span>
            </div>
            <label
              htmlFor={post?.id}
              className='cursor-pointer dark:bg-gray-36'
            >
              <FaComment
                size={25}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className='dark:bg-gray-36'
              />
            </label>

            <FaShare
              onClick={() => handleShare(post.id)} // Implement handleShare function
              size={25}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              className='dark:bg-gray-36'
            />
          </div>
        </div>
        <div className='py-3 dark:bg-gray-36'>
          <Comments post={post} comment={comment} postId={post.Id} />
        </div>
      </div>
    )
  );
};

export default PostCard;
