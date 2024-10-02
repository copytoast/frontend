import React from "react";

import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import { OnboardingContext } from "@/contexts/Onboarding";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";

export default function Username() {
  const onboarding = React.useContext(OnboardingContext);

  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);

  const dynamicStyles = {
    root: {
      flex: 1,
      paddingBottom: bottomButtonHeight,
    },
  };

  const nextButtonEnabled = onboarding.state.username.length > 0;

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  function handleNext() {
    router.push("/onboarding/id");
  }

  return (
    <ColumnFlex style={dynamicStyles.root}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          이름을 입력해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          암기빵은 다른 사람과 상호작용할 수 있는 플랫폼이에요. 다른 사람이 보게
          될 나의 이름을 정해주세요.
        </Typography>
      </ColumnFlex>

      {/* 콘텐츠 */}
      <View style={styles.content}>
        <TextField
          placeholder={"이름"}
          variant={"standard"}
          value={onboarding.state.username}
          onChangeText={(username) => {
            onboarding.dispatch((prev) => ({ ...prev, username }));
          }}
          onSubmitEditing={handleNext}
        />
      </View>

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
            iconSize={24}
            style={styles.bottomButton}
            onPress={nextButtonEnabled ? handleNext : undefined}
            disabled={!nextButtonEnabled}
          />
        </BottomButton>
      </View>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
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
