import { getToastErrorMessage } from "../../../components/toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
class ForgotPasswordService {
  constructor() {}

  static sendResetLink = async (email: string) => {
    if (!email) {
      const errorMessage = getToastErrorMessage(
        new Error("Email is required"),
        "Email is required",
      );
      return errorMessage;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/forget-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }

      return {
        statusCode: 400,
        message: "Something went wrong",
        data: null,
      };
    }
  };

  static resetPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }

      return {
        statusCode: 500,
        message: "Something went wrong",
        data: null,
      };
    }
  };
}
export { ForgotPasswordService };
