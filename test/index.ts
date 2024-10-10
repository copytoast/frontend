import axiosInstance from "@/api";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axiosInstance);

// userExists
mock
  .onGet("/user/exists", { params: { username: "admin", id: undefined } })
  .withDelayInMs(1000)
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: true,
    },
  });

mock
  .onGet("/user/exists", { params: { username: undefined, id: "admin" } })
  .withDelayInMs(1000)
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: true,
    },
  });

mock
  .onGet("/user/exists")
  .withDelayInMs(1000)
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: false,
    },
  });

export default mock;
