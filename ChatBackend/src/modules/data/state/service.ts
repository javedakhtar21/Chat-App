// import { StateModel } from "./model";
// import { CounterModel } from "../../auth/counter";

// class StateService {
//   constructor() {}

//   getNextId = async (key: String) => {
//     const counter = await CounterModel.findOneAndUpdate(
//       { _id: key },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true },
//     );
//     return counter.seq;
//   };

//   createState = async (requestBody: any) => {
//     try {
//       const { name } = requestBody;
//       if (!name) {
//         return {
//           statusCode: 400,
//           data: null,
//           message: "name is required to create states",
//         };
//       }

//       const stateId = await this.getNextId("stateId");

//       const newState = await StateModel.create({
//         id: stateId,
//         name,
//       });

//       return {
//         statusCode: 201,
//         data: newState,
//         message: "State created successfully",
//       };
//     } catch (error) {
//       console.log("Error creating state:", error);
//       return {
//         statusCode: 500,
//         data: null,
//         message: "Failed to create state",
//       };
//     }
//   };

//   getStates = async () => {
//     try {
//       const states = await StateModel.find().sort({ name: 1 }).lean();
//       const isStatesEmpty = states.length === 0;

//       return {
//         statusCode: 200,
//         data: isStatesEmpty ? [] : states,
//         message: isStatesEmpty
//           ? "No states found"
//           : "States fetched successfully",
//       };
//     } catch (error) {
//       console.log("Error fetching states:", error);
//       return {
//         statusCode: 500,
//         data: null,
//         message: "Failed to fetch states",
//       };
//     }
//   };
// }

// const stateService = new StateService();
// export default stateService;

import { StateModel } from "./model";
import { CounterModel } from "../../auth/counter";

class StateService {
  getNextId = async (key: string) => {
    const counter = await CounterModel.findOneAndUpdate(
      { _id: key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return counter.seq;
  };

  createState = async (requestBody: any) => {
    const { name } = requestBody;

    if (!name) {
      throw new Error("name is required to create states");
    }

    const stateId = await this.getNextId("stateId");

    const newState = await StateModel.create({
      id: stateId,
      name,
    });

    return newState;
  };

  getStates = async () => {
    debugger
    const states = await StateModel.find().sort({ name: 1 }).lean();

    return states;
  };
}

export default new StateService();
