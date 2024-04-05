import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // userAvatar using React Icons
import { useNavigate } from "react-router-dom";
import { calculateDateTime } from "../assets/Functions/DateFunctions";
import PostManipulateItems from "../assets/Widgets/PostManipulateItems";
import Follow from "../profile/Widgets/Follow";
import { UserContext } from "../Context/UserContext";
import Skeleton from "@mui/material/Skeleton";

const UserAvatar = () => {
  return (
    <FaUserCircle className='text-gray-500 text-4xl [&>*]:dark:bg-gray-60' />
  );
};

const PostOwnerTab = ({ owner, post, setPosts }) => {
  const { user } = useContext(UserContext);
  const [revealDate, setRevealDate] = useState();
  const [loadingOwner, setLoadingOwner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (owner) {
      const revealDate = calculateDateTime(new Date(post?.createdAt));
      setRevealDate(revealDate);
      setLoadingOwner(false);
    }
  }, [owner, post]);

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className='flex items-center justify-between cursor-pointer sm:px-1 lg:px-4 dark:bg-gray-36 hover:bg-gray-100 transition duration-300 ease-in-out my-2 *:dark:bg-gray-36 '>
      <div className='flex items-center dark:bg-gray-36'>
        <div className='mr-4 dark:bg-gray-36 [&>*]:dark:bg-gray-60 '>
          {loadingOwner ? (
            <Skeleton
              variant='circular'
              width={40}
              height={40}
              className='[&>*]:dark:bg-gray-800'
            />
          ) : owner?.image ? (
            <img
              className='rounded-full w-10 h-10 object-cover cursor-pointer'
              src={owner.image}
              alt='owner Avatar'
              onClick={() => handleClick(owner?.id)}
            />
          ) : (
            <UserAvatar />
          )}
        </div>
        <div>
          {loadingOwner ? (
            <div className='dark:bg-gray-36 [&>*]:dark:bg-gray-60'>
              <Skeleton variant='text' width={100} height={20} />
              <Skeleton variant='text' width={50} height={12} />
            </div>
          ) : (
            owner && (
              <div className='flex flex-col text-gray-800 dark:text-gray-300 dark:bg-gray-36'>
                <h4 className='text-md font-semibold  mb-1 dark:bg-gray-36'>
                  {owner.name}
                </h4>
                <p className='text-[10px] font-semibold dark:bg-gray-36'>
                  {revealDate}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {!user || !post ? (
        <Skeleton variant='circular' width={30} height={30} />
      ) : post.userId === user.id ? ( // If post belongs to the user
        <PostManipulateItems id={post.id} post={post} setPosts={setPosts} />
      ) : (
        <Follow followerId={user.id} followingId={post.userId} />
      )}
    </div>
  );
};

export default PostOwnerTab;
