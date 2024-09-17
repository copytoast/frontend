import React from "react";

import { View, StyleSheet } from "react-native";

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
      width: `${
        100 * ((currentStep + 1) / steps.length - 1 / (steps.length * 2))
      }%`,
    },
  });

  return (
    <RowFlex width="100%">
      <View style={{ ...styles.line, ...styles.backgroundLine }} />
      <View style={{ ...styles.line, ...styles.foregroundLine }} />

      {steps.map((step, index) => (
        <ColumnFlex key={step} gap={6} flex={1} alignItems="center">
          {/* 아이콘 */}
          {index <= currentStep && <Logo width={32} height={32} />}
          {index > currentStep && <GreyLogo width={32} height={32} />}

          {/* 텍스트 */}
          {index < currentStep && (
            <Typography weight={"medium"} color={Colors.primary}>
              {step}
            </Typography>
          )}
          {index === currentStep && (
            <Typography weight={"bold"} color={Colors.primary}>
              {step}
            </Typography>
          )}
          {index > currentStep && (
            <Typography weight={"medium"} color={Colors.grey}>
              {step}
            </Typography>
          )}
        </ColumnFlex>
      ))}
    </RowFlex>
  );
}
