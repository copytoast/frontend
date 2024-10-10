import React from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SessionProvider } from "@/contexts/Session";

// for test
import "@/test";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 글꼴 로드
  const [loaded] = useFonts({
    PretendardBold: require("../assets/fonts/Pretendard-Bold.otf"),
    PretendardMedium: require("../assets/fonts/Pretendard-Medium.otf"),
    PretendardRegular: require("../assets/fonts/Pretendard-Regular.otf"),
    PretendardLight: require("../assets/fonts/Pretendard-Light.otf"),
  });

  React.useEffect(() => {
    if (!loaded) return;

    // 글꼴 로드가 완료되면 스플래시 화면을 숨김
    SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return loaded ? (
    <SessionProvider>
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
            headerShown: true,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack>
    </SessionProvider>
  ) : null;
}
