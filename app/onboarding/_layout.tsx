import React from "react";

import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, router, Slot, usePathname } from "expo-router";

import { useHeaderHeight } from "@react-navigation/elements";
import { type NavigationAction } from "@react-navigation/native";

import Colors from "@/constants/Colors";

import ProgressBar from "@/components/ProgressBar";
import ColumnFlex from "@/components/ColumnFlex";

import ExitModal from "./exitModal";

export type OnboardingData = Partial<{
  username: string;
  id: string;
  toast: string[];
}>;

export default function OnboardingLayout() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const pathname = usePathname();

  const exitAction = React.useRef<NavigationAction>();

  const [step, setStep] = React.useState(0);
  const [exitModalOpen, setExitModalOpen] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  // 키보드 이벤트 감지
  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  // 페이지 나가기 이벤트 감지
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      exitAction.current = e.data.action;
      e.preventDefault();
      setExitModalOpen(true);
    });
  }, []);

  // pathname 변경 감지
  React.useEffect(() => {
    if (pathname === "/onboarding/username") setStep(0);
    else if (pathname === "/onboarding/id") setStep(1);
    else if (pathname === "/onboarding/toast") setStep(2);
    else if (pathname === "/onboarding/term") setStep(3);
  }, [pathname]);

  // 모달 닫기 핸들러
  function handleModalClose() {
    setExitModalOpen(false);
    if (exitAction.current) navigation.dispatch(exitAction.current);
  }

  // 모달 확인 핸들러
  function handleModalConfirm() {
    setExitModalOpen(false);
  }

  // 스타일
  const dynamicStyles = {
    root: {
      paddingTop: headerHeight,
    },
  };

  return (
    <ColumnFlex
      style={[styles.root, dynamicStyles.root]}
      width={"100%"}
      height={"100%"}
    >
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.scrollWrapper}
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

      {/* 모달 */}
      <ExitModal
        visible={exitModalOpen}
        onCancel={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
  },
  top: {
    height: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  scrollWrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomButton: {
    flex: 1,
  },
});
