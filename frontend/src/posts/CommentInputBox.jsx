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
}) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState(existingComment || "");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(post?.comment || []);
  }, [post?.comment]);

  const handleComment = async (postId) => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    if (existingComment) {
      const data = await handleEditComment(existingCommentId, comment);
      if (data.success) {
        toast.success(data.message);
        setComments((prev) => [
          ...(prev.id == existingCommentId ? data.updatedComment : prev),
        ]);
        console.log(comments);
        setComment("");
      } else {
        toast.error(data.error);
      }
    } else {
      const data = await handleCreateComment(postId, comment);
      if (data.success) {
        toast.success(data.message);
        setComments([data.newComment, ...comments]);
        setComment("");
      } else {
        toast.error(data.error);
      }
    }
  };

  return (
    user && (
      <div className='comment-input flex items-center mt-1'>
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
            id={post?.id}
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
    )
  );
};

export default CommentInputBox;
