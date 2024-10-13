import React from "react";

import { View, StyleSheet, Animated, Easing } from "react-native";

import Logo from "@/assets/vectors/logo.svg";
import GreyLogo from "@/assets/vectors/logo_grey.svg";

import Typography from "@/components/Typography";
import Colors from "@/constants/Colors";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const [prevStep, setPrevStep] = React.useState(currentStep);
  const [animationFinished, setAnimationFinished] = React.useState(true);

  const widthAnimated = React.useRef(new Animated.Value(0)).current;

  const dynamicStyles = getDynamicStyles({ widthAnimated });

  // steps 개수 또는 currentStep이 바뀔 때 애니메이션 실행
  React.useEffect(() => {
    Animated.timing(widthAnimated, {
      toValue: Math.min(
        (currentStep + 1) / steps.length - 1 / (steps.length * 2),
        1
      ),
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setAnimationFinished(true);
        setPrevStep(currentStep);
      }
    });

    return () => {
      setAnimationFinished(false);
    };
  }, [steps.length, currentStep]);

  // 현재 스텝 이전의 스텝들은 주황색으로 표시
  function shouldBeOrange(index: number) {
    return (
      index < currentStep ||
      (index === currentStep && (animationFinished || prevStep > currentStep))
    );
  }

  return (
    <View style={staticStyles.root}>
      <Animated.View style={[staticStyles.line, staticStyles.backgroundLine]} />
      <Animated.View
        style={[
          staticStyles.line,
          staticStyles.foregroundLine,
          dynamicStyles.foregroundLine,
        ]}
      />

      {steps.map((step, index) => (
        <View style={staticStyles.step} key={step}>
          {/* 아이콘 */}
          {shouldBeOrange(index) ? (
            <Logo width={32} height={32} />
          ) : (
            <GreyLogo width={32} height={32} />
          )}

          {/* 텍스트 */}
          {shouldBeOrange(index) && index < currentStep && (
            <Typography weight={"medium"} color={Colors.primary}>
              {step}
            </Typography>
          )}
          {shouldBeOrange(index) && index === currentStep && (
            <Typography weight={"bold"} color={Colors.primary}>
              {step}
            </Typography>
          )}
          {!shouldBeOrange(index) && (
            <Typography weight={"medium"} color={Colors.grey}>
              {step}
            </Typography>
          )}
        </View>
      ))}
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
  },
  step: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  line: {
    position: "absolute",
    width: "100%",
    top: 16,
    borderRadius: 4,
    height: 8,
    backgroundColor: Colors.greyLight,
  },
  backgroundLine: {
    backgroundColor: Colors.greyLight,
  },
  foregroundLine: {
    backgroundColor: Colors.primary,
  },
});

interface DynamicStylesProps {
  widthAnimated: Animated.Value;
}

const getDynamicStyles = (props: DynamicStylesProps) => ({
  foregroundLine: {
    width: props.widthAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
  },
});
