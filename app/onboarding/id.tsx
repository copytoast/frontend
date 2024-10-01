import React from "react";

import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";
import RowFlex from "@/components/RowFlex";

import { OnboardingContext } from "@/contexts/Onboarding";

import EmailIcon from "@/assets/vectors/email.svg";
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

  const nextButtonEnabled = onboarding.state.id.length > 0;

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  function handleNext() {
    router.push("/onboarding/toast");
  }

  return (
    <ColumnFlex style={dynamicStyles.root}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          아이디를 정해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          로그인하거나 친구가 나를 찾을 때 사용하게 될 나만의 고유한 아이디를
          정해주세요.
        </Typography>
      </ColumnFlex>

      {/* 콘텐츠 */}
      <View style={styles.content}>
        <RowFlex alignItems={"center"} gap={5} width={"100%"}>
          <EmailIcon width={24} height={24} />
          <TextField
            placeholder={"아이디"}
            variant={"standard"}
            style={styles.textField}
            value={onboarding.state.id}
            onChangeText={(id) => {
              onboarding.dispatch((prev) => ({ ...prev, id }));
            }}
            onSubmitEditing={handleNext}
          />
        </RowFlex>
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
            label: "이전",
            onPress: handleBack,
          }}
        >
          <Button
            label={"다음"}
            color={Colors.primary}
            icon={<ArrowForward />}
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
    flex: 1,
  },
});
