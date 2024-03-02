import { prisma } from "../prismaconfig/config.js";
import { matchPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { Post: true },
    });
    if (!users) {
      res.send({
        success: true,
        message: "No users found",
        users,
      });
    }
    res.send({
      success: true,
      message: "Users found",
      users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.send({
        success: false,
        message: "Please fill all the fields",
      });
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.send({
        success: true,
        message: "Registed Successfully!",
        user,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    {
      if (matchPassword(user.password, password)) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .send({
            success: true,
            message: "Login Successful!",
            user,
          });
      } else {
        res.send({
          success: false,
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export { getUser, registerUser, login };
