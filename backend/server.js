import express from "express";
import { userRoute } from "./route/userRoute.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { postRoute } from "./route/postRoute.js";
import { commentRoute } from "./route/commentRoute.js";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    secure: true,
    credentials: true,
  })
);

app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);
app.use("/api/v1", commentRoute);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
