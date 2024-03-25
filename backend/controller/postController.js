import { prisma } from "../prismaconfig/config.js";
import { sendNofication } from "./notificationController.js";

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
      comment: true,
    },
  });
  try {
    if (!posts.length) {
      res.send({
        success: true,
        message: "No posts found",
        posts,
      });
    } else {
      res.send({
        success: true,
        message: "Post found",
        posts,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    const posts = await prisma.post.findMany();
    const allpost = [post, ...posts.filter((nextpost) => nextpost.id !== id)];
    res.send({
      success: true,
      message: "Post found successfully",
      allpost,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  const { caption, images } = req.body;
  const { id } = req.user;
  try {
    const post = await prisma.post.create({
      data: {
        caption,
        images,
        userId: id,
      },
    });
    res.send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  const { id, caption, images } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        caption,
        images,
      },
    });
    res.send({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    res.send({
      success: true,
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const likeAPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    const isAlreadyLiked = post.likedBy.includes(userId);
    if (isAlreadyLiked) {
      const newpost = await prisma.post.update({
        where: { id },
        data: {
          likedBy: {
            set: post.likedBy.filter((id) => id !== userId),
          },
        },
      });
      const notification = sendNofication(
        "like",
        "liked your post",
        post.userId,
        userId
      );
      res.send({
        success: true,
        message: "Post unliked successfully",
        newpost,
        notification,
      });
    } else {
      const post = await prisma.post.update({
        where: { id },
        data: {
          likedBy: {
            push: userId,
          },
        },
      });
      res.send({
        success: true,
        message: "Liked successfully",
        post,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost, likeAPost };
