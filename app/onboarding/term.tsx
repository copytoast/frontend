import React from "react";

import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";

import { SessionContext } from "@/contexts/Session";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";
import Arrow from "@/assets/vectors/arrow.svg";

// sample data
const sampleSession = {
  token: "sample_token",
  user: {
    username: "관리자",
    id: "admin",
  },
};

export default function Term() {
  const session = React.useContext(SessionContext);

  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

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
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      session.dispatch(sampleSession);
    }, 500);
  }

  return (
    <ColumnFlex style={dynamicStyles.root}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          모두 완료됐어요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          약관에 모두 동의하면 모든 가입 절차가 끝나요.
        </Typography>
      </ColumnFlex>

      {/* 콘텐츠 */}
      <View style={styles.content}>
        <Button
          label={"서비스 이용 약관"}
          style={styles.termButton}
          contentStyle={styles.termButtonContent}
          color={Colors.greyLighter}
          icon={<Arrow />}
          iconSize={20}
          iconPosition={"right"}
        />
        <Button
          label={"개인정보 취급 방침"}
          style={styles.termButton}
          contentStyle={styles.termButtonContent}
          color={Colors.greyLighter}
          icon={<Arrow />}
          iconSize={20}
          iconPosition={"right"}
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
            label: "이전",
            onPress: handleBack,
          }}
        >
          <Button
            label={"모두 동의하고 가입 완료"}
            color={Colors.primary}
            icon={<ArrowForward />}
            iconSize={24}
            style={styles.bottomButton}
            onPress={handleNext}
            loading={loading}
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
    gap: 5,
  },
  termButton: {
    height: 50,
  },
  termButtonContent: {
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
