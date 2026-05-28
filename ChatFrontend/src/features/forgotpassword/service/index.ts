import { getToastErrorMessage } from "../../../components/toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
class ForgotPasswordService {
    constructor() { }

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
            const errorMessage = getToastErrorMessage(
                error,
                "Failed to send reset link",
            );
            return errorMessage;
        }
    };

    static resetPassword = async (newPassword: string, confirmPassword: string) => {
        if (!newPassword || !confirmPassword) {
            const errorMessage = getToastErrorMessage(
                new Error("New password and confirm password are required"),
                "New password and confirm password are required",
            );
            return errorMessage;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/reset-password`, {
                newPassword,
                confirmPassword,
            });
            return response.data;
        } catch (error) {
            const errorMessage = getToastErrorMessage(error, "Failed to reset password");
            return errorMessage;
        }
    }
}
export { ForgotPasswordService };
