import mock from "./mock";

import type { GetRecommendedToastsResult } from "@/api/getRecommendedToasts";

const toasts: GetRecommendedToastsResult["toasts"] = [
  {
    id: 0,
    name: "수능 영단어 1,000선",
    addCount: 10232,
    description:
      "대학수학능력시험 영어 영역에 빈출되는 영단어 1,000개를 모아놓았어요.",
  },
  {
    id: 1,
    name: "주기율표",
    addCount: 8435,
    description: "주기율표에 있는 원소를 순서대로 모아놓았어요.",
  },
  {
    id: 2,
    name: "한자 1,000자",
    addCount: 6931,
    description: "한자 1,000자를 모아놓았어요.",
  },
];

mock.onPost("/toast/recommend", { count: 0 }).reply(200, {
  code: 1000,
  message: "추천 암기빵 목록을 조회했어요.",
  result: {
    toasts: [],
  },
});

mock.onPost("/toast/recommend", { count: 1 }).reply(200, {
  code: 1000,
  message: "추천 암기빵 목록을 조회했어요.",
  result: {
    toasts: toasts.slice(0, 1),
  },
});

mock.onPost("/toast/recommend", { count: 2 }).reply(200, {
  code: 1000,
  message: "추천 암기빵 목록을 조회했어요.",
  result: {
    toasts: toasts.slice(0, 2),
  },
});

mock.onPost("/toast/recommend").reply(200, {
  code: 1000,
  message: "추천 암기빵 목록을 조회했어요.",
  result: {
    toasts,
  },
});
