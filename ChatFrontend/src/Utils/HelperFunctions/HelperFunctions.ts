import { authService } from "../../features/auth";
import { customSocket } from "../../socket";
import { toast } from "../../components/toast";

class HelperFunctions {
  constructor() {}

  getDateAndTime = () => {
    const date = new Date();

    const formattedDateAndTime = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return formattedDateAndTime;
  };

  getLocalStorageItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
  }

  async logoutHandler(navigate: any) {
    try {
      debugger
      const response = await authService.logout();
      if (response.statusCode === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        customSocket.disconnect();
        navigate("/login", {replace: true});
        console.log("User logged out, socket disconnected: ", customSocket.id);
        toast.success(response.message || "Logout successful");
      } else {
        toast.error(response.message || "Logout failed. Please try again.");
      }
    } catch (error: any) {
      const errorMsg = error.message || error;
      toast.error(errorMsg || "Logout failed. Please try again.");
      console.log("Logout error: ", error);
    }
  }
}

export const HelperFunctionsClass = new HelperFunctions();
