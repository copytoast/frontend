import React from "react";

import {
  StyleSheet,
  Pressable,
  View,
  type PressableProps,
  type DimensionValue,
} from "react-native";

import Typography, { type Weight } from "@/components/Typography";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

type IconPosition = "left" | "right";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  fontWeight?: Weight;
  fontSize?: number;
  color?: string;
  icon?: React.ReactNode;
  iconSize?: DimensionValue;
  iconPosition?: IconPosition;
}

function Button({
  label,
  fontWeight = "regular",
  color = "none",
  fontSize,
  icon,
  iconSize,
  iconPosition = "left",
  disabled,
  style,
  ...props
}: ButtonProps) {
  const backgroundColor = disabled ? Colors.greyLight : color;

  // 스타일
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      gap: 10,
      backgroundColor,
    },
    icon: {
      width: iconSize,
      height: iconSize,
    },
  });

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.root,
        style instanceof Function ? style({ pressed }) : style,
      ]}
    >
      {icon && iconPosition === "left" && (
        <View style={styles.icon}>{icon}</View>
      )}
      <Typography
        size={fontSize}
        color={isDarkColor(backgroundColor) ? Colors.white : Colors.greyDark}
        weight={fontWeight}
      >
        {label}
      </Typography>
      {icon && iconPosition === "right" && (
        <View style={styles.icon}>{icon}</View>
      )}
    </Pressable>
  );
}

export default Button;
