import React, { useContext, useEffect, useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { UserContext } from "../Context/UserContext";
import { handleCreateComment } from "../Api/ApiReqest";
import { toast } from "react-toastify";
import { calculateDateTime } from "../assets/Functions/DateFunctions";
import axios from "axios";
import UserTab from "../components/UserTab";

const Comments = ({ post, showAllComments, setShowAllComments }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(post?.comment || []);
  }, [post?.comment]);

  const handleComment = async (postId) => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }

    const data = await handleCreateComment(postId, comment);
    if (data.success) {
      toast.success(data.message);
      setComments([...comments, data.newComment]);
      setComment("");
    } else {
      toast.error(data.error);
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    user && (
      <div className='mt-4'>
        {comments?.length > 0 && (
          <>
            {showAllComments ? (
              <>
                <button
                  onClick={toggleShowAllComments}
                  className='text-sm text-gray-600 mb-2 show-less-btn'
                >
                  Show less
                </button>
                {comments?.map((obj, index) => (
                  <div key={index} className='comment flex items-start mb-3'>
                    {obj?.userId && (
                      <div className='flex flex-col'>
                        <UserTab userId={obj?.userId} />
                        <div>
                          <p className='comment-text text-sm'>
                            {comments[index]?.comment}
                          </p>
                          <p className='comment-time text-xs text-gray-500'>
                            {comments[index]?.createdAt &&
                              calculateDateTime(
                                new Date(comments[index]?.createdAt)
                              )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <button
                onClick={toggleShowAllComments}
                className='text-sm text-gray-600 mb-2 view-more-btn'
              >
                View comments
              </button>
            )}
          </>
        )}

        <div className='comment-input flex items-center mt-3'>
          <div className='avatar-wrapper mr-3'>
            {user.image ? (
              <img
                src={user.image}
                alt='User Avatar'
                className='avatar rounded-full h-10 w-10'
              />
            ) : (
              <FaUserCircle className='avatar rounded-full text-gray-500' />
            )}
          </div>
          <div className='flex items-center w-full bottom-1'>
            <input
              type='text'
              placeholder='Add your comment'
              value={comment}
              maxLength={200} // Limiting comment length to 200 characters
              className='bg-transparent focus:outline-none flex-grow transition-all duration-300 border-b border-gray-300 focus:border-blue-500 px-2 py-1 rounded-lg'
              onChange={(e) => setComment(e.target.value)}
            />
            <span className='text-xs text-gray-400 mr-2'>
              {comment.length}/200
            </span>
            <BiPaperPlane
              onClick={(e) => handleComment(post?.id)}
              className='cursor-pointer text-blue-500 transition-all duration-300 transform hover:scale-125 scale-110'
              tabIndex={1}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Comments;
