import { Request, Response } from "express";
import { userService } from "./service";

export class UserController {

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({
        statusCode: 200,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to fetch users",
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(Number(userId));

      if (!user) {
        res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        statusCode: 200,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to fetch user",
      });
    }
  };

  updateUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          statusCode: 400,
          message: "User ID is required",
        });
        return;
      }

      const user = await userService.updateUserDetails(
        Number(userId),
        req.body
      );

      if (!user) {
        res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        statusCode: 200,
        message: "User details updated successfully",
        data: user,
      });

    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to update user details",
      });
    }
  };
}

export const userController = new UserController();