import { UserModel } from "./model";
import { CounterModel } from "./counter";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getNextUserId = async (): Promise<number> => {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );
  return counter.seq;
};

class AuthService {
  // register service
  async register(requestBody: any) {
    const isEmailExists = await UserModel.findOne({
      email: requestBody.email,
    });

    if (isEmailExists) {
      return {
        statusCode: 400,
        message: "Email already exists",
      };
    }

    const isPhoneNumberExists = await UserModel.findOne({
      phoneNumber: requestBody.phoneNumber,
    });

    if (isPhoneNumberExists) {
      return {
        statusCode: 400,
        message: "Phone number already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    const userId = await getNextUserId();

    const newUser = new UserModel({
      userId,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      email: requestBody.email,
      phoneNumber: requestBody.phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    };
  }

  //login service
  async login(requestBody: any) {
    const { email, password } = requestBody;
    debugger

    // const user = await UserModel.findOne({
    //   $or: [{ email }, { phoneNumber: email }],
    // });

    const user= await UserModel.findOne({email: email}).select("+password");

    if (!user) {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    );

    return {
      statusCode: 200,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    };
  }
}

export const authService = new AuthService();
// export const login = new Register();
