import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // UserAvatar using React Icons
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};

const UserTab = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = async (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <div
      className='tab-pane fade show active'
      id='home'
      role='tabpanel'
      onClick={(e) => handleClick(user.id)}
    >
      <div className='row'>
        <div className='col-lg-4'>
          <div className='card card-small mb-4 pt-3 shadow-md rounded-lg'>
            <div className='card-header border-b-0 flex justify-center items-center'>
              <div className=' mx-auto'>
                {user.image ? (
                  <img
                    className='rounded-full'
                    src={user.image}
                    width='110'
                    alt='User Avatar'
                  />
                ) : (
                  <UserAvatar />
                )}
              </div>
              {user && (
                <h4 className='px-3 text-xl bold text-center'>
                  {user.name.split(" ")[0]}
                </h4>
              )}
              <button
                type='button'
                className='mb-2 btn btn-sm btn-pill btn-outline-primary transform transition-all duration-300 ease-in-out px-4 py-2 rounded-md hover:scale-105 bg-blue-600 hover:bg-blue-400 hover:text-white flex items-center justify-center'
              >
                <FiUserPlus className='inline mr-1' />
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTab;
