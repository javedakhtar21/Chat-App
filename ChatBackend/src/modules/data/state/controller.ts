// import stateService from "./service";
// import { Request, Response } from "express";
// class StateController {
//   createState = async (req: Request, res: Response) => {
//     try {
//       const result = await stateService.createState(req.body);

//       return result;
//     } catch (error) {
//       console.error("Controller Error (createState):", error);

//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         data: null,
//       });
//     }
//   };

//   getStates = async (req: Request, res: Response) => {
//     try {
//       const result = await stateService.getStates();

//       return res.status(result.statusCode).json({
//         success: result.statusCode < 400,
//         message: result.message,
//         data: result.data,
//       });
//     } catch (error) {
//       console.error("Controller Error (getStates):", error);

//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         data: null,
//       });
//     }
//   };
// }

// const stateController = new StateController();
// export default stateController;

import stateService from "./service";
import { Request, Response } from "express";

class StateController {
  createState = async (req: Request, res: Response) => {
    try {
      const data = await stateService.createState(req.body);

      res.status(201).json({
        success: true,
        message: "State created successfully",
        data,
      });
    } catch (error: any) {
      console.error("Controller Error (createState):", error);

      res.status(400).json({
        success: false,
        message: error.message || "Failed to create state",
        data: null,
      });
    }
  };

  getStates = async (req: Request, res: Response) => {
    try {
      const states = await stateService.getStates();
      debugger;
      res.status(200).json({
        success: true,
        message: states.length
          ? "States fetched successfully"
          : "No states found",
        data: states,
      });
    } catch (error: any) {
      console.error("Controller Error (getStates):", error);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: null,
      });
    }
  };
}

export default new StateController();
