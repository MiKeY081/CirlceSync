import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handlelogout } from "../../Api/ApiReqest";
import {
  AiFillProfile,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function BasicMenu() {
  const { setUser } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = React.useContext(UserContext);
  const id = user?.id;
  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AiOutlineUser className='w-6 h-6 mr-4 transition duration-300 hover:text-gray-300' />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`profile/${id}`} className='flex items-center gap-3'>
            <AiOutlineUser /> Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}></MenuItem>
        <MenuItem onClick={handleClose}>
          {user?.id ? (
            <Link
              to={"/posts"}
              onClick={(e) => {
                handlelogout();
                setUser("");
              }}
              className='flex items-center gap-3'
            >
              <AiOutlineLogout />
              Logout
            </Link>
          ) : (
            <Link to={`/user/login`} className='flex items-center gap-3'>
              <AiOutlineLogin /> Login
            </Link>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
}
