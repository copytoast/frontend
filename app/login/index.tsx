import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Logo from "@/assets/vectors/logo.svg";
import Slogan from "@/assets/vectors/slogan.svg";
import TextLogo from "@/assets/vectors/text_logo.svg";
import GoogleLogo from "@/assets/vectors/google_logo.svg";
import KakaoLogo from "@/assets/vectors/kakao_logo.svg";

import Colors from "@/constants/Colors";

import Button from "@/components/Button";
import ColumnFlex from "@/components/ColumnFlex";

export default function Index() {
  function handleLogin() {
    // TODO: 소셜 로그인 처리
    router.push("/onboarding");
  }

  return (
    <ColumnFlex style={styles.root} width={"100%"} height={"100%"}>
      {/* 로고 */}
      <ColumnFlex
        style={styles.content}
        alignItems={"center"}
        width={"100%"}
        gap={20}
      >
        <ColumnFlex style={styles.top} alignItems={"center"} gap={20}>
          <Logo width={120} height={120} />
          <ColumnFlex style={styles.textLogo} alignItems={"center"} gap={10}>
            <Slogan />
            <TextLogo />
          </ColumnFlex>
        </ColumnFlex>
      </ColumnFlex>

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
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
  },
  content: {
    paddingTop: 120,
  },
  top: {},
  textLogo: {
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
