import { prisma } from "../prismaconfig/config.js";
import { sendNofication } from "./notificationController.js";

const getComments = async (req, res) => {
  const comment = await prisma.comment.findMany({
    // include: {
    //   user: true,
    //   post: true,
    // },
  });
  try {
    if (!comment.length) {
      res.send({
        success: true,
        message: "No comment found",
        comment,
      });
    } else {
      res.send({
        success: true,
        message: "Comment found",
        comment,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const createComment = async (req, res) => {
  const { comment, postId } = req.body;
  const { id } = req.user;
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    const newComment = await prisma.comment.create({
      data: {
        comment,
        postId,
        userId: id,
        owner: post.userId,
      },
    });
    if (post.userId != id) {
      const notification = sendNofication(
        "comment",
        "commented in your post",
        post.userId,
        id
      );
      res.send({
        success: true,
        message: "Comment added",
        newComment,
        notification,
      });
    } else {
      res.send({
        success: true,
        message: "Comment added",
        newComment,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { comment },
    });
    res.send({
      success: true,
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });
    res.send({
      success: true,
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      res.send({
        success: false,
        message: "Comment not found",
      });
    } else {
      res.send({
        success: true,
        message: "Comment loaded successfully",
        comment,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getCommentByPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { User: true },
      sortBy: { createdAt: "desc" },
    });
    console.log(post);
    const { comment } = post;
    console.log(comment);
    if (!comment) {
      res.send({
        success: true,
        message: "No comments",
        comment,
      });
    } else {
      res.send({
        success: true,
        message: "Comments loaded successfully",
        comment,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getPostByComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    console.log(comment);
    const post = await prisma.post.findUnique({
      where: { id: comment.postId },
    });
    if (!post) {
      res.send({
        success: false,
        message: "Post not found",
      });
    } else {
      res.send({
        success: true,
        message: "Post loaded successfully",
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

export {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentByPost,
  getPostByComment,
};
