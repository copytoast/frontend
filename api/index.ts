import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://copytoast.com/api",
  responseType: "json",
});

export interface CommonResponse<T> {
  code: number;
  message: string;
  result?: T;
}

export default axiosInstance;
