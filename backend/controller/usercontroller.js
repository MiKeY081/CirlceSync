import { prisma } from "../prismaconfig/config.js";
import { matchPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      res.send({
        success: true,
        message: "No users found",
        users,
      });
    } else {
      res.send({
        success: true,
        message: "Users found",
        users,
      });
    }
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

const updateUser = async (req, res) => {
  const { name, email, image, phone, address, dob } = req.body;
  const { id } = req.user;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image,
        phone,
        address,
        dob,
      },
    });
    res.send({
      success: true,
      message: "Profile updated Sucessfully!",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").send({
      success: true,
      message: "Logout successfully",
      user: {},
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.send({
        success: false,
        message: "Please provide user id",
      });
    } else {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      res.send({
        success: true,
        message: "User deleted Sucessfully!",
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

const getUser = async (req, res) => {
  try {
    if (req.user.id) {
      const { id } = req.user;
      const user = await prisma.user.findUnique({
        where: { id },
        include: { Post: true },
        include: { follower: true },
      });

      res.send({
        success: true,
        message: "User found",
        user,
      });
    } else {
      res.send({
        success: true,
        message: "No login session",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Post: true },
    });

    res.send({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
export {
  getUsers,
  registerUser,
  login,
  updateUser,
  logout,
  deleteUser,
  getUser,
  getUserById,
};
