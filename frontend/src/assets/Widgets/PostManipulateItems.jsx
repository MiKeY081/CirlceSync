import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handleDeletePost } from "../../Api/ApiReqest";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PostManipulateItems({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FiMoreVertical />
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
          <Link to={`/post/edit/${id}`}>Edit Post</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={(e) => handleDeletePost(id)}>Delete Post</div>
        </MenuItem>
      </Menu>
    </div>
  );
}
