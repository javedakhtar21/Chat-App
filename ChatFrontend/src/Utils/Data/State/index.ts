import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// 1. Interface banayein (apne API response ke hisaab se)
export interface IState {
  _id?: string;
  id?: number;
  name: string;
}

class StatesService {   
  getStates = async () => {
    try {
      const response = await axios.get(`${API_URL}/states`);
    //   debugger
      if (response) {
        return response?.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error?.response?.data?.message || "Failed to fetch states",
        );
      }
      throw new Error("Failed to fetch states");
    }
  };
}

const statesService = new StatesService();

export { statesService };
