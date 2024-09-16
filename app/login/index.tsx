import { StyleSheet, View } from "react-native";
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
    router.push("/onboarding");
  }

  return (
    <View style={styles.root}>
      {/* 로고 */}
      <View style={styles.content}>
        <View style={styles.top}>
          <Logo width={120} height={120} />
          <View style={styles.textLogo}>
            <Slogan />
            <TextLogo />
          </View>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <View style={styles.bottom}>
        <Button
          label={"Google 로그인"}
          color={Colors.greyLighter}
          icon={<GoogleLogo />}
          onPress={handleLogin}
          fullWidth
        />
        <Button
          label={"카카오 로그인"}
          color={"#FEE500"}
          icon={<KakaoLogo />}
          onPress={handleLogin}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingTop: 120,
    gap: 20,
  },
  top: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textLogo: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  bottom: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    padding: 20,
    gap: 10,
  },
});
