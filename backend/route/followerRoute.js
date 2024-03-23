import { Router } from "express";
import {
  addFollower,
  deleteFollower,
  getFollowers,
} from "../controller/followerController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = Router();

router.post("/follow", isSignedIn, addFollower);
router.get("/followers/:userId", isSignedIn, getFollowers);
router.delete("/unfollow", isSignedIn, deleteFollower);

export { router as followerRoute };
