import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  logout,
  registerUser,
  updateUser,
} from "../controller/usercontroller.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = Router();

router.get("/user/getusers", getUsers);
router.post("/user/register", registerUser);
router.post("/user/login", login);
router.put("/user/update/:id", updateUser);
router.post("/user/logout", logout);
router.delete("/user/delete/:id", deleteUser);
router.get("/user/getuser", isSignedIn, getUser);
export { router as userRoute };
