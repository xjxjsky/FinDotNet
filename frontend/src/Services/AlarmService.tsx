import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { AlarmGet, AlarmPost } from "../Models/RealAlarm";

const api = "http://localhost:5177/api/alarm/";

export const realAlarmDataAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<AlarmPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const realAlarmDataDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<AlarmPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const realAlarmDataGetAPI = async () => {
  try {
    const data = await axios.get<AlarmGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};
