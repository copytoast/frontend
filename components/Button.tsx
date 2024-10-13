import React from "react";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import Typography, { type Weight } from "@/components/Typography";
import FeedbackPressable, {
  type FeedbackPressableProps,
} from "@/components/FeedbackPressable";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";
import adjustSaturation from "@/utility/adjustSaturation";

type IconPosition = "left" | "right";

interface ButtonProps extends Omit<FeedbackPressableProps, "children"> {
  backgroundColor?: string;
  icon?: React.ReactElement;
  iconPosition?: IconPosition;
  label?: string;
  labelWeight?: Weight;
  labelSize?: number;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

function Button({
  backgroundColor = "#00000000",
  icon,
  iconPosition = "left",
  label,
  labelWeight = "medium",
  labelSize,
  loading = false,
  style,
  contentStyle,
  ...props
}: ButtonProps) {
  // 버튼이 비활성화인 경우 배경색의 채도를 낮춤
  const adjustedBackgroundColor = props.disabled
    ? adjustSaturation(backgroundColor, -1)
    : backgroundColor;

  // 배경색의 밝기에 따라 글자색 결정
  const isBackgroundColorDark = isDarkColor(adjustedBackgroundColor);
  const foreColor = isBackgroundColorDark ? Colors.white : Colors.greyDark;

  return (
    <FeedbackPressable
      {...props}
      disabled={props.disabled || loading}
      backgroundColor={adjustedBackgroundColor}
      style={[staticStyles.wrapper, style]}
    >
      <View style={[staticStyles.content, contentStyle]}>
        {loading ? (
          <ActivityIndicator color={foreColor} />
        ) : (
          <>
            {iconPosition === "left" && icon}
            {label !== undefined && (
              <Typography
                size={labelSize}
                color={foreColor}
                weight={labelWeight}
              >
                {label}
              </Typography>
            )}
            {iconPosition === "right" && icon}
          </>
        )}
      </View>
    </FeedbackPressable>
  );
}

const staticStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
  },
  content: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});

export default Button;
