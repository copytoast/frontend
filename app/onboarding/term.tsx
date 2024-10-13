import React from "react";

import { StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";

import Typography from "@/components/Typography";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import { SessionContext } from "@/contexts/Session";
import { OnboardingContext } from "@/contexts/Onboarding";

import signup from "@/api/signup";

export default function Term() {
  const onboarding = React.useContext(OnboardingContext);
  const session = React.useContext(SessionContext);

  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const dynamicStyles = getDynamicStyles({ bottomButtonHeight });

  const nextButtonEnabled = !loading;

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  async function handleNext() {
    if (!nextButtonEnabled) return;

    setLoading(true);
    const res = await signup({
      ...onboarding.state,
    });
    setLoading(false);

    const result = res.data.result;
    if (res.data.code !== 1000 || result === undefined) {
      // TODO: 에러 처리
      return;
    }

    session.dispatch({
      user: {
        id: onboarding.state.id,
        username: onboarding.state.username,
      },
      token: result.token.accessToken.token,
    });
  }

  return (
    <View style={[staticStyles.root, dynamicStyles.root]}>
      <StatusBar barStyle={"dark-content"} />
      {/* 상단 */}
      <View style={staticStyles.top}>
        <Typography size={30} weight={"bold"}>
          모두 완료됐어요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          약관에 모두 동의하면 모든 가입 절차가 끝나요.
        </Typography>
      </View>

      {/* 콘텐츠 */}
      <View style={staticStyles.content}>
        <TermButton
          label={"서비스 이용 약관"}
          onPress={() => {
            // TODO: 약관 페이지로 이동
          }}
        />
        <TermButton
          label={"개인정보 취급 방침"}
          onPress={() => {
            // TODO: 개인정보 취급 방침 페이지로 이동
          }}
        />
      </View>

      {/* 하단 */}
      <View
        style={staticStyles.bottom}
        onLayout={(event) =>
          setBottomButtonHeight(event.nativeEvent.layout.height)
        }
      >
        <BottomButton
          anchor={{
            label: "이전",
            onPress: handleBack,
          }}
        >
          <Button
            label={"모두 동의하고 가입 완료"}
            backgroundColor={Colors.primary}
            icon={
              <MaterialIcons
                name={"arrow-forward"}
                size={24}
                color={Colors.white}
              />
            }
            style={staticStyles.bottomButton}
            onPress={handleNext}
            disabled={!nextButtonEnabled}
            loading={loading}
          />
        </BottomButton>
      </View>
    </View>
  );
}

interface TermButtonProps {
  label: string;
  onPress: () => void;
}

const TermButton = (props: TermButtonProps) => {
  return (
    <Button
      label={props.label}
      style={staticStyles.termButton}
      contentStyle={staticStyles.termButtonContent}
      backgroundColor={Colors.greyLighter}
      icon={<MaterialIcons name={"arrow-forward"} size={20} />}
      iconPosition={"right"}
      onPress={props.onPress}
    />
  );
};

const staticStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    gap: 10,
    height: 200,
    padding: 20,
  },
  content: {
    padding: 20,
    gap: 5,
  },
  termButton: {
    height: 50,
  },
  termButtonContent: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  bottom: {
    backgroundColor: Colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  bottomButton: {
    width: "100%",
    height: 50,
  },
});

interface DynamicStylesProps {
  bottomButtonHeight: number;
}

const getDynamicStyles = ({ bottomButtonHeight }: DynamicStylesProps) => ({
  root: {
    paddingBottom: bottomButtonHeight,
  },
});
