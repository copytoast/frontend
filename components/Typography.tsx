import React from "react";

import { StyleSheet, Text, type TextProps } from "react-native";

type Size = "small" | "medium" | "large";
export type Weight = "light" | "regular" | "medium" | "bold";

interface TypographyProps extends Omit<TextProps, "font"> {
  size?: Size;
  weight?: Weight;
}

function Typography({
  size = "medium",
  weight = "regular",
  ...props
}: TypographyProps) {
  const styles = StyleSheet.create({
    root: {
      fontFamily: "Pretendard",
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
      }[size],
      fontWeight: weight,
    },
  });

  return <Text {...props} style={styles.root} />;
}

export default Typography;
