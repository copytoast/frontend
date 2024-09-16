import React from "react";

import {
  StyleSheet,
  Pressable,
  Animated,
  type PressableProps,
  View,
} from "react-native";
import Typography, { type Weight } from "./Typography";
import shadeColor from "@/utility/shadeColor";

type Size = "small" | "medium" | "large";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  size?: Size;
  color?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

function Button({
  label,
  size = "medium",
  color = "none",
  fullWidth = false,
  icon,
  ...props
}: ButtonProps) {
  // 스타일
  const styles = StyleSheet.create({
    root: {
      width: fullWidth ? "100%" : "auto",
      height: {
        small: 40,
        medium: 50,
        large: 60,
      }[size],
    },
    content: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      gap: 10,
      backgroundColor: color,
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
      style={styles.root}
    >
      <Animated.View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <Typography
          size={size}
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
      </Animated.View>
    </Pressable>
  );
}

export default Button;
