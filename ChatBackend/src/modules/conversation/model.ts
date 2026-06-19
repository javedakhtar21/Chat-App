import { model, Schema, Document } from "mongoose";

// 1. conversation schema
const conversationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastMessageText: {
      type: String,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);


// 2. conversation members schema
const conversationMemberSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["member", "admin", "owner"],
      default: "member",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    lastReadMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    lastReadAt: {
      type: Date,
      default: null,
    },

    unreadCount: {
      type: Number,
      default: 0,
    },

    isMuted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// putting index on the conversationId and UserId
conversationMemberSchema.index({ conversationId: 1, UserId: 1 }, {
  unique: true
})

export const ConversationModel = model("Conversation", conversationSchema);
export const ConversationMemberModel = model(
  "ConversationMember",
  conversationMemberSchema,
);
