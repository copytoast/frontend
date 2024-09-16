import React from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Pretendard: require("../assets/fonts/Pretendard.ttf"),
  });

  // 글꼴이 로드되면 스플래시 화면을 숨김
  React.useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
