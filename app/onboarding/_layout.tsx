import React from "react";

import { StyleSheet, View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";

import { router, Stack } from "expo-router";

import Colors from "@/constants/Colors";

import ProgressBar from "@/components/ProgressBar";
import ColumnFlex from "@/components/ColumnFlex";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";

export default function OnboardingLayout() {
  const headerHeight = useHeaderHeight();

  const [step, setStep] = React.useState(0);

  const styles = StyleSheet.create({
    root: {
      paddingTop: headerHeight,
      backgroundColor: Colors.white,
    },
    top: {
      padding: 20,
    },
    content: {
      padding: 20,
    },
    bottom: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      padding: 20,
    },
    bottomButton: {
      flex: 1,
    },
  });

  React.useEffect(() => {
    if (step === 0) router.push("/onboarding/username");
  }, [step]);

  return (
    <ColumnFlex style={styles.root} width={"100%"} height={"100%"}>
      {/* 상단 */}
      <View style={styles.top}>
        <ProgressBar
          steps={["닉네임", "아이디", "빵 담기"]}
          currentStep={step}
        />
      </View>

      {/* 콘텐츠 */}
      <ColumnFlex style={styles.content}>
        <Stack>
          <Stack.Screen name="username" options={{ headerShown: false }} />
        </Stack>
      </ColumnFlex>

      {/* 하단 */}
      <View style={styles.bottom}>
        <BottomButton
          anchor={{
            label: "돌아가기",
            onPress: () => {},
          }}
        >
          <Button
            label={"다음"}
            color={Colors.primary}
            icon={<ArrowForward />}
            style={styles.bottomButton}
            onPress={() => {}}
          />
        </BottomButton>
      </View>
    </ColumnFlex>
  );
}
