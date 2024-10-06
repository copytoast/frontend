import React from "react";

import {
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import EmptyCheckBoxIcon from "@/assets/vectors/checkbox_empty.svg";
import CheckBoxIcon from "@/assets/vectors/checkbox.svg";

import RowFlex from "@/components/RowFlex";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  checkBoxSize?: number;
}

export default function CheckBox({
  checked,
  onChange,
  label,
  disabled,
  containerStyle,
  checkBoxSize,
}: CheckBoxProps) {
  function handlePress() {
    if (disabled) return;
    onChange(!checked);
  }

  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      <RowFlex style={styles.root}>
        {!checked && (
          <EmptyCheckBoxIcon
            width={checkBoxSize ?? 24}
            height={checkBoxSize ?? 24}
          />
        )}
        {checked && (
          <CheckBoxIcon
            width={checkBoxSize ?? 24}
            height={checkBoxSize ?? 24}
          />
        )}

        {label}
      </RowFlex>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {},
});
