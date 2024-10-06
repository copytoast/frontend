import React from "react";

import {
  StyleSheet,
  View,
  type PressableProps,
  type DimensionValue,
  type ViewStyle,
  type StyleProp,
} from "react-native";

import Typography, { type Weight } from "@/components/Typography";
import FeedbackPressable from "@/components/FeedbackPressable";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

type IconPosition = "left" | "right";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label?: string;
  fontWeight?: Weight;
  fontSize?: number;
  color?: string;
  icon?: React.ReactNode;
  iconSize?: DimensionValue;
  iconPosition?: IconPosition;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

function Button({
  label,
  fontWeight = "regular",
  color = "#00000000",
  fontSize,
  icon,
  iconSize,
  iconPosition = "left",
  contentStyle,
  ...props
}: ButtonProps) {
  const backgroundColor = props.disabled ? Colors.greyLight : color;
  const isBackgroundColorDark = isDarkColor(backgroundColor);
  const iconOnly = label === undefined;

  const dynamicStyles = {
    icon: {
      width: iconSize,
      height: iconSize,
    },
    root: {
      padding: iconOnly ? 5 : undefined,
      borderRadius: iconOnly ? 1000 : 10,
    },
  };

  const iconComponent = <View style={dynamicStyles.icon}>{icon}</View>;

  return (
    <FeedbackPressable
      {...props}
      color={backgroundColor}
      style={[styles.root, dynamicStyles.root, props.style]}
      contentStyle={[styles.content, contentStyle]}
    >
      {icon && iconPosition === "left" && iconComponent}
      {label !== undefined && (
        <Typography
          size={fontSize}
          color={isBackgroundColorDark ? Colors.white : Colors.greyDark}
          weight={fontWeight}
        >
          {label}
        </Typography>
      )}
      {icon && iconPosition === "right" && iconComponent}
    </FeedbackPressable>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default Button;
