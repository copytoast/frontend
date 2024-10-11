import mock from "./mock";

mock
  .onGet("/user/exists", { params: { username: "admin", id: undefined } })
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: true,
    },
  });

mock
  .onGet("/user/exists", { params: { username: undefined, id: "admin" } })
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: true,
    },
  });

mock
  .onGet("/user/exists", { params: { username: "admin", id: "admin" } })
  .reply(200, {
    code: 1000,
    message: "사용자 존재 여부를 조회하였어요.",
    result: {
      exists: true,
    },
  });

mock.onGet("/user/exists").reply(200, {
  code: 1000,
  message: "사용자 존재 여부를 조회하였어요.",
  result: {
    exists: false,
  },
});
