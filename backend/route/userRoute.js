import { Router } from "express";
import { getUser, login, registerUser } from "../controller/usercontroller.js";

const router = Router();

router.get("/user/getusers", getUser);
router.post("/user/register", registerUser);
router.post("/user/login", login);
export { router as userRoute };
