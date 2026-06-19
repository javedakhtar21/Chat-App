// 2. user connection schema(for storing the user socket connection details)
import { Schema, model } from "mongoose";

const userConnectionSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },

    socketId: {
      type: String,
      required: true,
      index: true,
    },

    connectedAt: {
      type: Date,
      default: Date.now,
    },

    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const UserConnectionModel = model(
  "UserConnection",
  userConnectionSchema,
);