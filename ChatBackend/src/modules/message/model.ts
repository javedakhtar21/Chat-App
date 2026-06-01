import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "video", "file", "audio"],
      default: "text",
    },

    content: {
      type: String,
      default: "",
    },

    attachmentUrl: {
      type: String,
      default: null,
    },

    replyToMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // creates createdAt + updatedAt
  },
);

// putting index on the conversationId and createdAt
messageSchema.index({ conversationId: 1, createdAt: -1 });
export const MessageModel = model("Message", messageSchema);
