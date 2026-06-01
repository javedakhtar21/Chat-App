import { UserModel } from "../users/model";
export class UserService {
  async getAllUsers() {
    return await UserModel.find({}, { password: 0 });
  }

  async getUserById(userId: number) {
    return await UserModel.findOne({ userId }, { password: 0 });
  }

  async updateUserDetails(userId: number, userData: any) {
    return await UserModel.findOneAndUpdate(
      { userId },
      { ...userData },
      { returnDocument: "after" },
    );
  }
}

export const userService = new UserService();
