import jwt from "jsonwebtoken";
import { prisma } from "../prismaconfig/config.js";

export const isSignedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id } });
    req.user = user;
    delete user.password;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: "Please login first",
    });
  }
};
