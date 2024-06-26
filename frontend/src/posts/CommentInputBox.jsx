import React, { useContext, useEffect, useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { UserContext } from "../Context/UserContext";
import { handleCreateComment, handleEditComment } from "../Api/ApiReqest";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const CommentInputBox = ({
  post,
  comment: existingComment,
  commentId: existingCommentId,
  comments, 
  setComments
}) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState(existingComment || "");

  const handleComment = async (postId) => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    try {
      if (existingComment) {
        const data = await handleEditComment(existingCommentId, comment);
        if (data.success) {
          toast.success(data.message);
          setComments((prevCom) => {
            return prevCom.map((prev) =>
              prev.id == existingCommentId ? data.updatedComment : prev
            );
          });
          setComment("");
        } else {
          toast.error(data.error);
        }
      } else {
        const data = await handleCreateComment(postId, comment);
        if (data.success) {
          toast.success(data.message);
          console.log("entered");
          setComments((prev) => {
            return [data.newComment, ...prev];
          });
          setComment("");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <div className='comment-input flex items-center mt-1 [&>*]:dark:bg-gray-36 dark:bg-gray-36 text-black'>
        <div className='avatar-wrapper mr-3'>
          {user.image ? (
            <img
              src={user.image}
              alt='User Avatar'
              className='avatar rounded-full h-10 w-10'
            />
          ) : (
            <FaUserCircle className='avatar rounded-full dark:text-gray-500' />
          )}
        </div>
        <div className='flex items-center w-full bottom-1 dark:bg-gray-58'>
          <input
            type='text'
            placeholder='Add your comment'
            id={post?.id}
            value={comment}
            maxLength={200} // Limiting comment length to 200 characters
            className='dark:bg-gray-60 outline-none flex-grow transition-all duration-300 border-b  dark:border-gray-60 dark:focus:border-gray-60   px-2 py-1 rounded-lg'
            onChange={(e) => setComment(e.target.value)}
          />
          <span className='text-xs ml-2 dark:bg-gray-58 dark:text-gray-400 mr-2'>
            {comment.length}/200
          </span>
          <BiPaperPlane
            onClick={(e) => handleComment(post?.id)}
            className='cursor-pointer text-blue-500 dark:text-gray-300 transition-all duration-300 transform hover:scale-125 scale-110 dark:bg-gray-58'
            tabIndex={1}
          />
        </div>
      </div>
    )
  );
};

export default CommentInputBox;
