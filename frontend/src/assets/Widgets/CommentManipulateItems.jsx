import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from "@mui/material/IconButton";
import Comments from "../../posts/Comments";
import { handleDeleteComment } from "../../Api/ApiReqest";

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

export default function CommentManipulateItems({ id, comment, setComments }) {
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
    handleDeleteComment(id);
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id='demo-customized-menu'
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              setIsEditFormOpen(!isEditFormOpen);
              handleClose();
            }}
            disableRipple
          >
            <EditIcon />
            Edit comment
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={(e) => {
              handleDelete(id);
              handleClose();
            }}
            disableRipple
          >
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple></MenuItem>
        </StyledMenu>
      </div>
      {isEditFormOpen && (
        <div className='relative z-50 '>
          <Comments comment={comment} commentId={id} />
        </div>
      )}
    </div>
  );
}
