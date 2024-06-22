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
      <div className='mt-1 p-0 dark:bg-gray-36 '>
        <ShowComments
          post={post}
          comments={comments}
          setComments={setComments}
        />
        <CommentInputBox
          post={post}
          comment={existingComment}
          comments={comments}
          setComments={setComments}
        />
      </div>
    )
  );
};

export default Comments;
