import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handlelogout } from "../../Api/ApiReqest";
import { AiFillProfile, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = React.useContext(UserContext);

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
          <Link to={"/profile"}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}></MenuItem>
        <MenuItem onClick={handleClose}>
          {user?.id ? (
            <div onClick={(e) => handlelogout()}>Logout</div>
          ) : (
            <Link to={"/user/login"}>Login</Link>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
}
