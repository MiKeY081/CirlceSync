import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handlelogout } from "../../Api/ApiReqest";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function BasicMenu() {
  const { setUser } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleTheme, setToggleTheme] = React.useState("light");
  const open = Boolean(anchorEl);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme !== "dark" ? "dark" : "light";
    document.body.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setToggleTheme(newTheme);
  };

  // To retrieve the theme preference on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setToggleTheme(savedTheme);
      document.body.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

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
      <div className='dark:bg-gray-58 dark:text-gray-300' onClick={handleClick}>
        <AiOutlineUser className='w-6 h-6 mr-4 transition  duration-300 dark:text-white text-gray-800 dark:bg-gray-58' />
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className='dark:bg-transparent dark:border-gray-300'
      >
        <div onClick={handleClose} className='text-gray-800 dark:text-white'>
          <Link
            to={`profile/${id}`}
            className='block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-60 [&>*]:dark:hover:bg-gray-60'
          >
            <AiOutlineUser className='inline-block w-5 h-5 mr-2' /> Profile
          </Link>
        </div>
        <div
          onClick={handleClose}
          className='text-gray-800 dark:text-white dark:hover:bg-gray-60 [&>*]:dark:hover:bg-gray-60'
        >
          {user?.id ? (
            <Link
              to={"/posts"}
              onClick={(e) => {
                handlelogout();
                setUser("");
              }}
              className='block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-60 [&>*]:dark:hover:bg-gray-60'
            >
              <AiOutlineLogout className='inline-block w-5 h-5 mr-2' /> Logout
            </Link>
          ) : (
            <Link
              to={`/user/login`}
              className='block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600'
            >
              <AiOutlineLogin className='inline-block w-5 h-5 mr-2' /> Login
            </Link>
          )}
        </div>
        <div onClick={handleToggleTheme} className=' dark:text-white'>
          <span className='block px-4 py-2 hover:bg-gray-200  dark:hover:bg-gray-60 [&>*]:dark:hover:bg-gray-60'>
            {toggleTheme !== "dark" ? <Brightness4Icon /> : <Brightness7Icon />}{" "}
            Theme
          </span>
        </div>
      </Menu>
    </div>
  );
}
