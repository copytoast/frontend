import React from "react";

import { StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";

import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import { OnboardingContext } from "@/contexts/Onboarding";

import userExists from "@/api/userExists";

export default function Username() {
  const onboarding = React.useContext(OnboardingContext);

  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const dynamicStyles = getDynamicStyles({ bottomButtonHeight });

  // 다음 버튼 활성화 여부
  const nextButtonEnabled =
    onboarding.state.username.length > 0 && error === undefined && !loading;

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  async function handleNext() {
    if (!nextButtonEnabled) return;

    setLoading(true);
    const res = await userExists({ username: onboarding.state.username });
    const result = res.data.result;
    setLoading(false);

    if (res.data.code !== 1000 || result === undefined) {
      setError(res.data.message);
      return;
    }

    if (result.exists === true) {
      setError("이름이 이미 사용되고 있어요.");
      return;
    }

    router.push("/onboarding/id");
  }

  // 수정 핸들러
  function handleChangeText(text: string) {
    onboarding.dispatch((prev) => ({ ...prev, username: text }));
    if (error) setError(undefined);
  }

  return (
    <View style={[staticStyles.root, dynamicStyles.root]}>
      <StatusBar barStyle={"dark-content"} />
      {/* 상단 */}
      <View style={staticStyles.top}>
        <Typography size={30} weight={"bold"}>
          이름을 입력해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          암기빵은 다른 사람과 상호작용할 수 있는 플랫폼이에요. 다른 사람이 보게
          될 나의 이름을 정해주세요.
        </Typography>
      </View>

      {/* 콘텐츠 */}
      <View style={staticStyles.content}>
        <TextField
          placeholder={"이름"}
          variant={"standard"}
          value={onboarding.state.username}
          onChangeText={handleChangeText}
          onSubmitEditing={handleNext}
          editable={!loading}
          autoFocus
        />
        {error && (
          <Typography color={Colors.red} weight={"medium"}>
            {error}
          </Typography>
        )}
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
            label: "돌아가기",
            onPress: handleBack,
          }}
        >
          <Button
            label={"다음"}
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
