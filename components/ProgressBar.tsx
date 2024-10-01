import React from "react";

import { View, StyleSheet, Animated, Easing } from "react-native";

import Logo from "@/assets/vectors/logo.svg";
import GreyLogo from "@/assets/vectors/logo_grey.svg";

import RowFlex from "@/components/RowFlex";
import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import Colors from "@/constants/Colors";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const [prevStep, setPrevStep] = React.useState(currentStep);
  const [widthAnimationCompleted, setWidthAnimationCompleted] =
    React.useState(true);

  const widthAnimated = React.useRef(new Animated.Value(0)).current;

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
        setWidthAnimationCompleted(true);
        setPrevStep(currentStep);
      }
    });

    return () => {
      setWidthAnimationCompleted(false);
    };
  }, [steps.length, currentStep]);

  function shouldBeOrange(index: number) {
    return (
      index < currentStep ||
      (index === currentStep &&
        (widthAnimationCompleted || prevStep > currentStep))
    );
  }

  const styles = StyleSheet.create({
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
      width: widthAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
      }),
    },
  });

  return (
    <RowFlex width="100%">
      <Animated.View style={{ ...styles.line, ...styles.backgroundLine }} />
      <Animated.View style={{ ...styles.line, ...styles.foregroundLine }} />

      {steps.map((step, index) => (
        <ColumnFlex key={step} gap={6} flex={1} alignItems="center">
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
        </ColumnFlex>
      ))}
    </RowFlex>
  );
}
