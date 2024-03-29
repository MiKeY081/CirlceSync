import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // UserAvatar using React Icons
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import axios from "axios";

const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};

const UserTab = ({ user, userId }) => {
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [owner, setOwner] = useState();
  const handleClick = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  useEffect(() => {
    if (userId) {
      const id = userId;
      const fetchUserById = async () => {
        const { data } = await axios.get(`/user/getuser/${id}`);
        if (data.success) {
          setOwner(data.user);
        }
      };
      fetchUserById();
    }
    if (user) {
      setOwner(user);
    }
  }, []);

  return (
    owner && (
      <div className='flex items-center justify-between cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-200 hover:rounded-lg transition duration-300 ease-in w-full'>
        <div
          className='flex items-center'
          onClick={() => handleClick(owner?.id)}
        >
          <div className='mr-4 gap-4'>
            {owner?.image ? (
              <img
                className='rounded-full w-10 h-10 object-cover'
                src={owner.image}
                alt='owner Avatar'
              />
            ) : (
              <UserAvatar />
            )}
          </div>
          <div>
            {owner && (
              <h4 className='text-md font-semibold text-gray-800 hover:text-blue-600 mb-1'>
                {owner.name}
              </h4>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserTab;
