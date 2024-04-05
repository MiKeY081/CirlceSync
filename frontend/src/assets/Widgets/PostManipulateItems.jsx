import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PostForm from "../../posts/PostForm";
import { handleDeletePost } from "../../Api/ApiReqest";
import { Backdrop, Popover } from "@mui/material";
import { MdMoreVert } from "react-icons/md";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function PostManipulateItems({ id, post, setPosts }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    handleDeletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className='flex flex-col gap-4  [&>*]:dark:bg-gray-36 dark:bg-gray-36'>
      <div className=''>
        <div
          onClick={handleClick}
          className='outline-none focus:outline-none dark:bg-gray-36'
        >
          <MdMoreVert className='text-2xl scale-125 text-gray-500 dark:text-gray-100 dark:bg-gray-36 rounded-full' />
        </div>
        <Popover
          id='notification-menu'
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
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
          className='dark:text-gray-300 dark:bg-transparent '
        >
          <div className='py-4 px-8 dark:bg-gray-58 rounded-md'>
            <MenuItem
              onClick={(e) => {
                setIsEditFormOpen(!isEditFormOpen);
                handleClose();
              }}
              disableRipple
            >
              <EditIcon className='dark:bg-gray-58' />
              Edit Post
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={(e) => {
                handleDelete(id);
                handleClose();
              }}
              disableRipple
            >
              <ArchiveIcon className='dark:bg-gray-58' />
              Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple></MenuItem>
          </div>
        </Popover>
      </div>
      {isEditFormOpen && <PostForm post={post} setPosts={setPosts} />}
    </div>
  );
}
