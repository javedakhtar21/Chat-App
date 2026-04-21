import { CityModel } from "./model";
import { CounterModel } from "../../auth/counter";

class CityService {
  getNextId = async (key: string) => {
    const counter = await CounterModel.findOneAndUpdate(
      { _id: key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return counter.seq;
  };

  createCity = async (body: any) => {
    const { name, stateId } = body;

    if (!name) {
      throw new Error("City name is required");
    }

    if (!stateId) {
      throw new Error("stateId is required");
    }

    const existingCityFound = await CityModel.findOne({ name: name });
    console.log("Existing city: ",existingCityFound)
    const iscityExistAlready = !!existingCityFound;

    if (iscityExistAlready) {
      const error: any = new Error("City already exists");
      error.data = existingCityFound;
      throw error;
    }
    const cityId = await this.getNextId("cityId");

    const city = await CityModel.create({
      id: cityId,
      name,
      stateId,
    });

    return city;
  };

  getCities = async () => {
    const cities = await CityModel.find().sort({ name: 1 }).lean();
    return cities;
  };

  getCitiesByState = async (stateId: number) => {
    if (!stateId) {
      throw new Error("stateId is required");
    }

    const cities = await CityModel.find({ stateId }).sort({ name: 1 }).lean();
    return cities;
  };
}

export default new CityService();
