import React, { useContext } from "react";
import Follow from "./Follow";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};
const UserCard = ({ user }) => {
  const client = useContext(UserContext);

  console.log(user.id);
  return (
    user && (
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='gap-4'>
          {user?.image ? (
            <img
              className='rounded-full w-10 h-10 object-cover object-center'
              src={user.image}
              alt='User Avatar'
            />
          ) : (
            <UserAvatar />
          )}
        </div>
        <div className='p-4'>
          <h3 className='text-gray-800 font-semibold text-xl'>{user.name}</h3>

          <Follow followerId={client?.id} followingId={user?.id} />
        </div>
      </div>
    )
  );
};

export default UserCard;
