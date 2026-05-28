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

  getCitiesByState = async (selectedState: IState) => {
    try {
      const id = selectedState.id;
      if (!id) {
        throw new Error("State ID is needed to fetch cities");
      }
      const response = await axios.get(`${API_URL}/cities/state/${id}`);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch the city by stateId",
        );
      }
      throw new Error("Failed to fetch the city by stateId");
    }
  };
}

const statesService = new StatesService();

export { statesService };
