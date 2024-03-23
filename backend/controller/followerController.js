import { prisma } from "../prismaconfig/config.js";

const addFollower = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const newFollow = await prisma.follower.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
      },
    });

    res.send({
      success: true,
      data: newFollow,
      message: "Follower added successfully",
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

    await prisma.follower.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    res.send({
      success: true,
      message: "Follower deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export { addFollower, getFollowers, deleteFollower };
