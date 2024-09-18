import React from "react";

import { Keyboard, ScrollView, StyleSheet, View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";

import { router, Slot } from "expo-router";

import Colors from "@/constants/Colors";

import ProgressBar from "@/components/ProgressBar";
import ColumnFlex from "@/components/ColumnFlex";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";

export default function OnboardingLayout() {
  const headerHeight = useHeaderHeight();

  const [step, setStep] = React.useState(0);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);

  const styles = StyleSheet.create({
    root: {
      paddingTop: headerHeight,
      backgroundColor: Colors.white,
    },
    scroll: {
      flex: 1,
      height: "100%",
    },
    top: {
      padding: 20,
    },
    scrollWrapper: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingBottom: bottomButtonHeight + 20,
      flex: 1,
    },
    bottom: {
      backgroundColor: Colors.white,
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
    router.navigate("/onboarding/username");

    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return (
    <ColumnFlex style={styles.root} width={"100%"} height={"100%"}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets
      >
        {/* 상단 */}
        {!keyboardOpen && (
          <View style={styles.top}>
            <ProgressBar
              steps={["닉네임", "아이디", "빵 담기"]}
              currentStep={step}
            />
          </View>
        )}

        {/* 콘텐츠 */}
        <View style={styles.content}>
          <Slot />
        </View>
      </ScrollView>

      {/* 하단 */}
      <View
        style={styles.bottom}
        onLayout={(event) =>
          setBottomButtonHeight(event.nativeEvent.layout.height)
        }
      >
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
