import React from "react";

import { StyleSheet, Text, type TextProps } from "react-native";

type Size = number | "small" | "medium" | "large";
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
      fontFamily: `Pretendard${weight.charAt(0).toUpperCase()}${weight.slice(
        1
      )}`,
      fontSize:
        typeof size === "number"
          ? size
          : {
              small: 12,
              medium: 16,
              large: 20,
            }[size],
    },
  });

  return <Text {...props} style={[styles.root, props.style]} />;
}

export default Typography;
