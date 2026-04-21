import cityService from "./service";
import { Request, Response } from "express";

class CityController {
  createCity = async (req: Request, res: Response) => {
    try {
      const data = await cityService.createCity(req.body);

      res.status(201).json({
        success: true,
        message: "City created successfully",
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create city",
        data: null,
      });
    }
  };

  getCities = async (req: Request, res: Response) => {
    try {
      const data = await cityService.getCities();

      res.status(200).json({
        success: true,
        message: data.length
          ? "Cities fetched successfully"
          : "No cities found",
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: null,
      });
    }
  };

  getCitiesByState = async (req: Request, res: Response) => {
    try {
      const stateId = Number(req.params.stateId);

      const data = await cityService.getCitiesByState(stateId);

      res.status(200).json({
        success: true,
        message: data.length
          ? "Cities fetched successfully"
          : "No cities found",
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch cities",
        data: null,
      });
    }
  };
}

export default new CityController();
