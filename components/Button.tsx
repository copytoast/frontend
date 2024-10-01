import React from "react";

import { StyleSheet, Pressable, type PressableProps, View } from "react-native";

import Typography, {
  type Weight,
  type Size as FontSize,
} from "@/components/Typography";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

type Size = "small" | "medium" | "large";
type IconPosition = "left" | "right";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  size?: Size;
  fontSize?: FontSize;
  color?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

function Button({
  label,
  size = "medium",
  color = "none",
  fullWidth = false,
  fontSize,
  icon,
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
      width: fullWidth ? "100%" : "auto",
      height: {
        small: 40,
        medium: 50,
        large: 60,
      }[size],
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      gap: 10,
      backgroundColor,
    },
    icon: {
      width: {
        small: 16,
        medium: 20,
        large: 24,
      }[size],
      height: {
        small: 16,
        medium: 20,
        large: 24,
      }[size],
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
        size={fontSize ? fontSize : size}
        color={isDarkColor(backgroundColor) ? Colors.white : Colors.greyDark}
        weight={
          {
            small: "regular" as Weight,
            medium: "medium" as Weight,
            large: "bold" as Weight,
          }[size]
        }
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
