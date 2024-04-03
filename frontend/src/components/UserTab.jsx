import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // UserAvatar using React Icons
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

const UserAvatar = () => {
  return <FaUserCircle className='text-gray-500 text-4xl' />;
};

const UserTab = ({ user, userId, children }) => {
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [owner, setOwner] = useState();
  const [loading, setLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let userData;
        if (userId) {
          const { data } = await axios.get(`/user/getuser/${userId}`);
          userData = data;
        } else if (user) {
          userData = { success: true, user };
        }
        if (userData.success) {
          setOwner(userData.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, user]);

  return (
    <div className='flex items-center justify-between cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-200 hover:rounded-lg transition duration-300 ease-in w-full'>
      {loading ? (
        <div className='flex items-center gap-4'>
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='text' width={100} height={30} />
        </div>
      ) : (
        owner && (
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
              {children}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserTab;
