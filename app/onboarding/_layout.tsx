import React from "react";

import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, Slot, usePathname, Redirect } from "expo-router";

import { useHeaderHeight } from "@react-navigation/elements";
import { EventArg, type NavigationAction } from "@react-navigation/native";

import Colors from "@/constants/Colors";

import ProgressBar from "@/components/ProgressBar";
import ExitModal from "@/components/onboarding/ExitModal";

import { OnboardingProvider } from "@/contexts/Onboarding";
import { SessionContext } from "@/contexts/Session";

export type OnboardingData = Partial<{
  username: string;
  id: string;
  toast: string[];
}>;

export default function OnboardingLayout() {
  const session = React.useContext(SessionContext);

  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const pathname = usePathname();

  const exitAction = React.useRef<NavigationAction>();

  const [step, setStep] = React.useState(0);
  const [exitModalOpen, setExitModalOpen] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  const loggedIn =
    session.state.user !== undefined && session.state.token !== undefined;

  const dynamicStyles = getDynamicStyles({ headerHeight });

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
    const handleBeforeRemove = (
      e: EventArg<"beforeRemove", true, { action: NavigationAction }>
    ) => {
      if (e.data.action.type === "REPLACE") return;
      exitAction.current = e.data.action;
      e.preventDefault();
      setExitModalOpen(true);
    };

    navigation.addListener("beforeRemove", handleBeforeRemove);

    return () => navigation.removeListener("beforeRemove", handleBeforeRemove);
  });

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

  if (loggedIn) return <Redirect href={"/"} />;

  return (
    <View style={[styles.root, dynamicStyles.root]}>
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
          <OnboardingProvider>
            <Slot />
          </OnboardingProvider>
        </View>
      </ScrollView>

      {/* 모달 */}
      <ExitModal
        visible={exitModalOpen}
        onCancel={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
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

interface DynamicStylesProps {
  headerHeight: number;
}

const getDynamicStyles = ({ headerHeight }: DynamicStylesProps) => ({
  root: {
    paddingTop: headerHeight,
  },
});
