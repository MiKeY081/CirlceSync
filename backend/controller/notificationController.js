import { prisma } from "../prismaconfig/config.js";

const sendNofication = async (type, message, receiverId, senderId, postId) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        type,
        message,
        senderId,
        receiverId,
      },
    });
    return notification;
  } catch (error) {
    return { notification: error.message };
  }
};

export { sendNofication };
