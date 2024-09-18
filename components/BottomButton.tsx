import React from "react";

import { Pressable, StyleSheet } from "react-native";

import ColumnFlex, { type ColumnFlexProps } from "@/components/ColumnFlex";
import Typography from "./Typography";
import Colors from "@/constants/Colors";
import RowFlex from "./RowFlex";

interface Button {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

interface BottomButtonProps extends ColumnFlexProps {
  anchor?: Button;
  children?: React.ReactNode;
}

export default function BottomButton({
  anchor,
  children,
  ...props
}: BottomButtonProps) {
  return (
    <ColumnFlex {...props} gap={20} width={"100%"} alignItems={"center"}>
      {anchor && (
        <Pressable onPress={anchor.onPress} disabled={anchor.disabled}>
          <Typography
            size={"medium"}
            color={Colors.greyDark}
            style={styles.anchorLabel}
          >
            {anchor.label}
          </Typography>
        </Pressable>
      )}

      <RowFlex gap={10} width={"100%"}>
        {children}
      </RowFlex>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  anchorLabel: {
    textDecorationLine: "underline",
  },
});
