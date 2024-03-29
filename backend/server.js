import express from "express";
import { userRoute } from "./route/userRoute.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { postRoute } from "./route/postRoute.js";
import { commentRoute } from "./route/commentRoute.js";
import { followerRoute } from "./route/followerRoute.js";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin:
      "http://localhost:5173" || "https://sync-in-circle-frontend.vercel.app",
    secure: true,
    credentials: true,
  })
);

app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", followerRoute);

const PORT = "https://sync-in-circle-backend.vercel.app" || 5001;

app.listen(PORT, () => {
  console.log("Server is running on port 5001");
});
