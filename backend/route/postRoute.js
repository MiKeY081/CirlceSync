import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likeAPost,
  updatePost,
} from "../controller/postController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = Router();

router.get("/post/getposts", isSignedIn, getPosts);
router.post("/post/create", isSignedIn, createPost);
router.put("/post/update/:id", isSignedIn, updatePost);
router.delete("/post/delete/:id", isSignedIn, deletePost);
router.post("/post/like/:id", isSignedIn, likeAPost);
router.get("/post/:id", isSignedIn, getPostById);

export { router as postRoute };
