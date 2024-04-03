import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import CommentInputBox from "./CommentInputBox";
import ShowComments from "./ShowComments";

const Comments = ({
  post,
  comment: existingComment,
  commentId: existingCommentId,
}) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(post?.comment || []);
  }, [post?.comment]);

  return (
    user && (
      <div className='mt-1 p-0 '>
        <ShowComments post={post} />
        <CommentInputBox post={post} comment={existingComment} />
      </div>
    )
  );
};

export default Comments;
