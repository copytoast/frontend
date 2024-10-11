import mock from "./mock";

import type { SignupResult } from "@/api/signup";

const token: SignupResult["token"] = {
  accessToken: {
    token: "token",
    expiresIn: 1000,
  },
  refreshToken: {
    token: "token",
    expiresIn: 10000,
  },
};

mock.onPost("/user").reply(200, {
  code: 1000,
  message: "가입에 성공하였어요.",
  result: {
    token,
  },
});
