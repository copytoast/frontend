import React from "react";

import { StyleSheet, Text, type TextProps } from "react-native";

type Size = "small" | "medium" | "large";
export type Weight = "light" | "regular" | "medium" | "bold";

interface TypographyProps extends Omit<TextProps, "font"> {
  color?: string;
  size?: Size;
  weight?: Weight;
}

function Typography({
  color = "black",
  size = "medium",
  weight = "regular",
  ...props
}: TypographyProps) {
  const styles = StyleSheet.create({
    root: {
      color,
      fontFamily: "Pretendard",
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
      }[size],
      fontWeight: {
        light: "300" as const,
        regular: "400" as const,
        medium: "500" as const,
        bold: "700" as const,
      }[weight],
    },
  });

  return <Text {...props} style={[styles.root, props.style]} />;
}

export default Typography;
