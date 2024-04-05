import React, { useContext, useEffect, useState } from "react";
import { IconButton, Badge, Popover, Typography } from "@mui/material";
import { AiOutlineBell } from "react-icons/ai";
import axios from "axios";
import UserTab from "./UserTab";
import { UserContext } from "../Context/UserContext";

const NotificationDropdown = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [senders, setSenders] = useState([]);
  const [isClicked, setIsClicked] = useState(false); // State to track if button is clicked
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsClicked(true); // Set isClicked to true when button is clicked
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    setNotifications(user?.notification || []);
  }, [user, user?.notification]);

  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const senderIds = notifications.map(
          (notification) => notification.senderId
        );
        const responses = await Promise.all(
          senderIds.map((id) => axios.get(`/user/getuser/${id}`))
        );
        const fetchedSenders = responses.map((response) =>
          response.data.success ? response.data.user : null
        );
        setSenders(fetchedSenders);
      } catch (error) {
        console.error("Error fetching senders:", error);
      }
    };

    if (notifications.length > 0) {
      fetchSenders();
    }
  }, [notifications]);

  return (
    <div className='relative dark:text-white'>
      <div
        onClick={handlePopoverOpen}
        className='outline-none focus:outline-none dark:bg-gray-58'
      >
        {/* Use Badge component to show notification count */}
        <Badge
          color='secondary'
          badgeContent={isClicked ? 0 : notifications.length}
        >
          <AiOutlineBell className='text-2xl dark:bg-gray-58 text-gray-800' />
        </Badge>
      </div>
      <Popover
        id='notification-menu'
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          className: "bg-white rounded-md shadow-md",
        }}
        className='dark:text-gray-300 dark:hover:text-gray-200 dark:bg-transparent'
      >
        <div className='p-4 dark:bg-gray-58'>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className='flex items-center flex-col mb-3 dark:bg-gray-58'
              >
                {senders[index] && (
                  <UserTab user={senders[index]}>
                    <Typography className='text-gray-800 ml-2 dark:text-gray-200'>
                      {notification.message}
                    </Typography>
                  </UserTab>
                )}
              </div>
            ))
          ) : (
            <Typography className='text-gray-800 dark:text-gray-200'>
              No notifications
            </Typography>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
