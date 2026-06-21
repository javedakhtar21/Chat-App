import { ConversationMemberModel, ConversationModel } from "./model";

export class ConversationService {
  static getConversations = async (userId: number) => {
    const conversations = await ConversationMemberModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },

      {
        $lookup: {
          from: "conversations",
          localField: "conversationId",
          foreignField: "_id",
          as: "conversation",
        },
      },

      {
        $unwind: "$conversation",
      },

      {
        $lookup: {
          from: "conversationmembers",

          let: {
            conversationId: "$conversationId",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$conversationId", "$$conversationId"],
                    },

                    {
                      $ne: ["$userId", userId],
                    },
                  ],
                },
              },
            },
          ],

          as: "otherUser",
        },
      },

      {
        $unwind: "$otherUser",
      },

      {
        $lookup: {
          from: "users",
          localField: "otherUser.userId",
          foreignField: "userId",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },
      {
        $project: {
          conversationId: 1,

          unreadCount: 1,

          user: {
            userId: "$user.userId",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            isOnline: "$user.isOnline",
          },

          lastMessage: "$conversation.lastMessageText",
          lastMessageAt: "$conversation.lastMessageAt",
        },
      },
      {
        $sort: {
          lastMessageAt: -1,
        },
      },
    ]);

    if (!conversations.length) {
      return {
        statusCode: 404,
        message: "No conversations found",
        data: [],
      };
    }

    return {
      statusCode: 200,
      message: "Conversations fetched successfully",
      data: conversations,
    };
  };

  static createConversation = async (senderId: number, receiverId: number) => {
    const existing = await ConversationMemberModel.aggregate([
      {
        $match: {
          UserId: {
            $in: [senderId, receiverId],
          },
        },
      },

      {
        $group: {
          _id: "$conversationId",

          count: {
            $sum: 1,
          },
        },
      },

      {
        $match: {
          count: 2,
        },
      },
    ]);

    if (existing.length) {
      return {
        statusCode: 200,
        message: "Conversation already exists",
        data: existing[0],
      };
    }

    const conv = await ConversationModel.create({
      createdBy: senderId,
    });

    await ConversationMemberModel.insertMany([
      {
        conversationId: conv._id,
        UserId: senderId,
      },
      {
        conversationId: conv._id,
        UserId: receiverId,
      },
    ]);

    return {
      statusCode: 201,
      message: "Conversation created successfully",
      data: conv,
    };
  };
}
