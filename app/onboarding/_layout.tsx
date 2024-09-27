import React from "react";

import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, router, Slot, usePathname } from "expo-router";

import { useHeaderHeight } from "@react-navigation/elements";
import { type NavigationAction } from "@react-navigation/native";

import Colors from "@/constants/Colors";

import ProgressBar from "@/components/ProgressBar";
import ColumnFlex from "@/components/ColumnFlex";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";
import ExitModal from "./exitModal";

export default function OnboardingLayout() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const pathname = usePathname();

  const [step, setStep] = React.useState(0);
  const [exitAction, setExitAction] = React.useState<NavigationAction>();
  const [exitModalOpen, setExitModalOpen] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);

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
      setExitAction(e.data.action);
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

  // 다음 버튼 핸들러
  function handleNext() {
    switch (pathname) {
      case "/onboarding/username":
        router.push("/onboarding/id");
        break;
      case "/onboarding/id":
        router.push("/onboarding/toast");
        break;
      case "/onboarding/toast":
        router.push("/onboarding/term");
        break;
    }
  }

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 모달 닫기 핸들러
  function handleModalClose() {
    setExitModalOpen(false);
    if (exitAction) navigation.dispatch(exitAction);
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
    content: {
      paddingBottom: bottomButtonHeight + 20,
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
        <View style={[styles.content, dynamicStyles.content]}>
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
            onPress: handleBack,
          }}
        >
          <Button
            label={"다음"}
            color={Colors.primary}
            icon={<ArrowForward />}
            style={styles.bottomButton}
            onPress={handleNext}
          />
        </BottomButton>
      </View>

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
