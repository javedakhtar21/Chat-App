import { Schema, model } from "mongoose";

interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  state: string;
  city: string;
  status: string;
  isOnline: boolean;
  lastSeen: Date;
}

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    userId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "active", "blocked"],
      required: false,
    },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null },
  },
  { timestamps: true },
);

// 2. user connection schema(for storing the user socket connection details)
const userConnectionSchema = new Schema(
  {
    userId: {
      type: Number,
      ref: "User",
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
export const UserModel = model<IUserDocument>("User", userSchema);
