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
  const [focus, setFocus] = React.useState(true);

  const dynamicStyles = getDynamicStyles({ bottomButtonHeight });

  // 다음 버튼 활성화 여부
  const nextButtonEnabled =
    onboarding.state.id.length > 0 && error === undefined && !loading;

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  async function handleNext() {
    if (!nextButtonEnabled) return;

    setLoading(true);
    const res = await userExists({ id: onboarding.state.id });
    const result = res.data.result;
    setLoading(false);

    if (res.data.code !== 1000 || result === undefined) {
      setError(res.data.message);
      return;
    }

    if (result.exists === true) {
      setError("아이디가 이미 사용되고 있어요.");
      return;
    }

    router.push("/onboarding/toast");
  }

  // 수정 핸들러
  function handleChangeText(text: string) {
    onboarding.dispatch((prev) => ({ ...prev, id: text }));
    if (error) setError(undefined);
  }

  return (
    <View style={[staticStyles.root, dynamicStyles.root]}>
      <StatusBar barStyle={"dark-content"} />
      {/* 상단 */}
      <View style={staticStyles.top}>
        <Typography size={30} weight={"bold"}>
          아이디를 정해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          로그인하거나 친구가 나를 찾을 때 사용하게 될 나만의 고유한 아이디를
          정해주세요.
        </Typography>
      </View>

      {/* 콘텐츠 */}
      <View style={staticStyles.content}>
        <View style={staticStyles.textFieldWrapper}>
          <MaterialIcons
            name={"alternate-email"}
            size={24}
            color={focus ? Colors.primary : Colors.grey}
          />
          <TextField
            placeholder={"아이디"}
            variant={"standard"}
            style={staticStyles.textField}
            value={onboarding.state.id}
            onChangeText={handleChangeText}
            onSubmitEditing={handleNext}
            editable={!loading}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            autoFocus
          />
        </View>
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
            label: "이전",
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
  textFieldWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    width: "100%",
  },
  textField: {
    flex: 1,
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
