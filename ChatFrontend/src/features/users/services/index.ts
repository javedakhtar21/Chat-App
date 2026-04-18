import axios from "axios";
import type { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface UserResponse {
  statusCode: number;
  message: string;
  data: User[];
}

export interface UserDetailResponse {
  statusCode: number;
  message: string;
  data: User;
}

const getToken = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }
};

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const token = getToken();
      const response = await axios.get<UserResponse>(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch users",
        );
      }
      throw new Error("Failed to fetch users");
    }
  },

  getUserById: async (userId: number): Promise<User> => {
    try {
      const token = getToken();
      const response = await axios.get<UserDetailResponse>(
        `${API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch user details",
        );
      }
      throw new Error("Failed to fetch user details");
    }
  },

  updateUserDetails: async (userId: any, data: any): Promise<User> => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      if (!data) {
        throw new Error("Missing user data");
      }

      const token = getToken();
      const response = await axios.put<UserDetailResponse>(
        `${API_URL}/users/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "Failed to update user details",
        );
      }
      throw new Error("Failed to update user details");
    }
  },
};
