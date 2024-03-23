import { prisma } from "../prismaconfig/config";

const addFollowing = async (req, res) => {
  try {
    const follow = await prisma.follower.create({ id });
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
