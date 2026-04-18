import { model, Schema, Document } from "mongoose";

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
}

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  gender: { type: String, required: false },
  state: { type: String, required: false },
  city: { type: String, required: false },
  status: {type: String,default: "pending", enum: ["pending", "active", "blocked"], required: false },
});

export const UserModel = model<IUserDocument>(
  "User",
  userSchema,
);
