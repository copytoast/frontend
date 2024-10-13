import React from "react";

import {
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import Typography from "@/components/Typography";

import Colors from "@/constants/Colors";

interface BottomButtonProps {
  anchor?: {
    label: string;
    onPress: () => void;
    disabled?: boolean;
  };
  wrapperStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default function BottomButton({
  anchor,
  children,
  wrapperStyle,
  ...props
}: BottomButtonProps) {
  return (
    <View {...props} style={[staticStyles.root, wrapperStyle]}>
      {anchor && (
        <Pressable onPress={anchor.onPress} disabled={anchor.disabled}>
          <Typography
            size={"medium"}
            color={Colors.greyDark}
            style={staticStyles.anchorLabel}
          >
            {anchor.label}
          </Typography>
        </Pressable>
      )}

      <View style={staticStyles.content}>{children}</View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  content: {
    gap: 10,
    width: "100%",
  },
  anchorLabel: {
    textDecorationLine: "underline",
  },
});
