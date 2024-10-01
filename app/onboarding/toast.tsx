import React from "react";

import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
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

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  function handleNext() {
    router.push("/onboarding/term");
  }

  return (
    <ColumnFlex style={dynamicStyles.root}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          암기빵을 담아주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          원하는 암기빵을 골라주세요. 지금 암기빵을 고르지 않고 나중에 나만의
          암기빵을 만들 수도 있어요.
        </Typography>
      </ColumnFlex>

      {/* 콘텐츠 */}
      <View></View>

      {/* 하단 */}
      <View
        style={styles.bottom}
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
            color={Colors.primary}
            icon={<ArrowForward />}
            style={styles.bottomButton}
            onPress={handleNext}
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
    flex: 1,
  },
});
