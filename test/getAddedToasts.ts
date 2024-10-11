import mock from "./mock";

import type { GetAddedToastsResult } from "@/api/getAddedToasts";

const toasts: GetAddedToastsResult["toasts"] = [
  {
    id: 0,
    name: "수능 영단어 1,000선",
    addCount: 10232,
    description:
      "대학수학능력시험 영어 영역에 빈출되는 영단어 1,000개를 모아놓았어요.",
    type: "MATCHING",
    view: 233273,
    creator: "admin",
    createdAt: "2021-08-01",
    updatedAt: "2024-09-21",
    added: true,
  },
  {
    id: 1,
    name: "주기율표",
    addCount: 8435,
    description: "주기율표에 있는 원소를 순서대로 모아놓았어요.",
    type: "ORDER",
    view: 94341,
    creator: "admin",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
    added: true,
  },
  {
    id: 2,
    name: "한자 1,000자",
    addCount: 6931,
    description: "한자 1,000자를 모아놓았어요.",
    type: "MATCHING",
    view: 10287,
    creator: "admin",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
    added: true,
  },
];

mock.onGet("/toast/added").reply(200, {
  code: 1000,
  message: "담은 암기빵 목록을 조회했어요.",
  result: {
    toasts,
  },
});
