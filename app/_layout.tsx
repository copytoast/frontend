import React from "react";

import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 글꼴 로드
  const [loaded] = useFonts({
    Pretendard: require("../assets/fonts/Pretendard.ttf"),
  });

  React.useEffect(() => {
    if (!loaded) return;

    // 글꼴 로드가 완료되면 스플래시 화면을 숨김
    SplashScreen.hideAsync();

    // 로그인이 되어 있지 않으면 로그인 화면으로 이동
    if (true) {
      router.replace("/login");
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
