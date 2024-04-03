import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { calculateDateTime } from "../assets/Functions/DateFunctions";
import UserTab from "../components/UserTab";
import CommentManipulateItems from "../assets/Widgets/CommentManipulateItems";

const ShowComments = ({ post }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    setComments(post?.comment || []);
  }, [post?.comment]);

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    user && (
      <>
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
                      <div className='flex w-full justify-between'>
                        <UserTab userId={obj?.userId}>
                          {comments[index]?.comment && (
                            <p className='comment-text text-sm'>
                              {comments[index]?.comment
                                .charAt(0)
                                .toUpperCase() +
                                comments[index]?.comment.slice(1)}
                            </p>
                          )}
                          <p className='comment-time text-xs text-gray-500'>
                            {comments[index]?.createdAt &&
                              calculateDateTime(
                                new Date(comments[index]?.createdAt)
                              )}
                          </p>
                        </UserTab>
                        {comments && (
                          <CommentManipulateItems
                            id={obj?.id}
                            comment={obj?.comment}
                            setComments={setComments}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <button
                onClick={toggleShowAllComments}
                className='text-sm text-gray-600 mb-1 view-more-btn'
              >
                View comments
              </button>
            )}
          </>
        )}
      </>
    )
  );
};

export default ShowComments;