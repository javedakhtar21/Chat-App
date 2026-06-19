import { UserModel } from "../users/model";
import { CounterModel } from "./counter";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { EmailHandler } from "../../util/EmailHandler";
import { TokenHandler } from "../../util/TokenHandler";
import { UserConnectionModel } from "../user-connection/model";
const getNextUserId = async (): Promise<number> => {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true },
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

    await EmailHandler.sendEmail(
      requestBody.email,
      requestBody.firstName,
      requestBody.password,
    );

    return {
      statusCode: 201,
      message:
        "Account created successfully. Login credentials sent to your registered email address.",
      data: newUser,
    };
  }

  //login service
  async login(requestBody: any) {
    const { email, password } = requestBody;
    // debugger;

    const user = await UserModel.findOne({ email: email }).select("+password");

    if (!user) {
      return {
        data: null,
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        data: null,
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    // const token = jwt.sign(
    //   { userId: user.userId, email: user.email },
    //   process.env.JWT_SECRET || "your-secret-key",
    //   { expiresIn: "24h" },
    // );

    const token = TokenHandler.createToken(
      {
        UserId: user.userId,
        email: user.email,
      },
      { tokenExpiry: "24h" },
    );

    return {
      statusCode: 200,
      message: "Login successfull",
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

  // logout service
  async logout(requestBody: any) {
    const { userId } = requestBody;

    if (!userId) {
      return {
        statusCode: 400,
        message: "UserId is required",
        data: null,
      };
    }

    const userDetails = await UserModel.findOne({ userId: userId });

    if (!userDetails) {
      return {
        statusCode: 404,
        message: "User not found",
        data: null,
      };
    }

    await UserConnectionModel.findOneAndDelete({ userId: userId });
    console.log(`User with userId ${userId} has been logged out and removed from active connections.`);

    return {
      statusCode: 200,
      message: "Logout successful",
      data: null,
    };
  }

  // this will send the reset password link to the user email
  async forgetPassword(requestBody: any) {
    // debugger;
    const { email } = requestBody;

    if (!email) {
      return {
        statusCode: 400,
        message: "Email is required",
        data: null,
      };
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return {
        statusCode: 404,
        message: "User with the provided email does not exist",
        data: null,
      };
    }

    const token = TokenHandler.createToken(
      {
        userId: user.userId,
        email: user.email,
      },
      { tokenExpiry: "15m" },
    );

    const resetLink = `${process.env.Frontend_URL}/reset-password?token=${token}`;

    await EmailHandler.sendForgotPasswordEmail(
      user.email,
      user.firstName,
      resetLink,
    );

    return {
      statusCode: 200,
      message: "Password reset link has been sent to your email address",
      data: null,
    };
  }

  // this will let the user set new password
  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (!token) {
      return {
        statusCode: 400,
        message: "Token is required",
        data: null,
      };
    }

    if (!newPassword || !confirmPassword) {
      return {
        statusCode: 400,
        message: "New password and confirm password are required",
        data: null,
      };
    }

    const decodedData = TokenHandler.verifyToken(token);

    if (!decodedData.status) {
      return {
        statusCode: 400,
        message: decodedData.message || "Reset link is invalid or expired",
        data: null,
      };
    }

    const { userId } = decodedData?.data as { userId: number; email: string };

    const user = await UserModel.findOne({ userId }).select("+password");

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return {
      statusCode: 200,
      message: "Password has been reset successfully",
      data: user.email,
    };
  }
}

export const authService = new AuthService();
