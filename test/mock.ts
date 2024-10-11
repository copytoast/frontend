import axiosInstance from "@/api";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 500 });

export default mock;
