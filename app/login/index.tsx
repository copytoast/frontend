import { StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Logo from "@/assets/vectors/logo.svg";
import Slogan from "@/assets/vectors/slogan.svg";
import TextLogo from "@/assets/vectors/text_logo.svg";
import GoogleLogo from "@/assets/vectors/google_logo.svg";
import KakaoLogo from "@/assets/vectors/kakao_logo.svg";

import Colors from "@/constants/Colors";

import Button from "@/components/Button";

export default function Index() {
  function handleLogin() {
    // TODO: 소셜 로그인 처리
    router.push("/onboarding/username");
  }

  return (
    <View style={staticStyles.root}>
      <StatusBar barStyle={"dark-content"} />
      {/* 로고 */}
      <View style={staticStyles.content}>
        <View style={staticStyles.top}>
          <Logo width={120} height={120} />
          <View style={staticStyles.logoWrapper}>
            <Slogan />
            <TextLogo />
          </View>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <View style={staticStyles.bottom}>
        <Button
          label={"Google 로그인"}
          backgroundColor={Colors.greyLighter}
          icon={<GoogleLogo width={24} height={24} />}
          onPress={handleLogin}
          style={staticStyles.loginButton}
        />
        <Button
          label={"카카오 로그인"}
          backgroundColor={"#FEE500"}
          icon={<KakaoLogo width={24} height={24} />}
          onPress={handleLogin}
          style={staticStyles.loginButton}
        />
      </View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
  },
  content: {
    paddingTop: 120,
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  top: {
    gap: 20,
    alignItems: "center",
  },
  logoWrapper: {
    gap: 10,
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    padding: 20,
    gap: 10,
  },
  loginButton: {
    width: "100%",
    height: 50,
  },
});
