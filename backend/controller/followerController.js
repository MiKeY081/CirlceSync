import { prisma } from "../prismaconfig/config.js";
import { sendNofication } from "./notificationController.js";

const addFollower = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follow = await prisma.follower.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
      },
    });
    const notification = await sendNofication(
      "follow",
      "started following you",
      followingId,
      followerId
    );
    res.send({
      success: true,
      message: "Follower added successfully",
      follow,
      notification,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await prisma.follower.findMany({
      where: {
        following: {
          id: userId,
        },
      },
    });

    res.send({
      success: true,
      message: "Followers fetched successfully",
      followers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteFollower = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follow = await prisma.follower.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    res.send({
      success: true,
      message: "Follower deleted successfully",
      follow,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export { addFollower, getFollowers, deleteFollower };
