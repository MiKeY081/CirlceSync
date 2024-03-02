import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentByPost,
  getComments,
  getPostByComment,
  updateComment,
} from "../controller/commentController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = Router();

router.get("/comment/getcomments", getComments);
router.post("/comment/create", isSignedIn, createComment);
router.put("/comment/update/:id", isSignedIn, updateComment);
router.delete("/comment/delete/:id", isSignedIn, deleteComment);

router.get("/comment/getpost/:id", getPostByComment);
// router.get("/comment/getpostcomment/:id", getCommentByPost);
router.get("/comment/getcomment/:id", getCommentById);

export { router as commentRoute };
