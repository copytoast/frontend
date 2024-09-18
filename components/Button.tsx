import React from "react";

import { StyleSheet, Pressable, type PressableProps, View } from "react-native";

import Typography, { type Weight } from "@/components/Typography";
import RowFlex from "@/components/RowFlex";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

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
      style={({ pressed }) => [
        props.style instanceof Function
          ? props.style({ pressed })
          : props.style,
        styles.root,
      ]}
    >
      <RowFlex style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <Typography
          size={size}
          color={isDarkColor(color) ? Colors.white : Colors.greyDark}
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
      </RowFlex>
    </Pressable>
  );
}

export default Button;
