import React from "react";

import {
  ColorValue,
  StyleSheet,
  View,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import FeedbackPressable from "@/components/FeedbackPressable";
import Typography, { type Weight } from "@/components/Typography";

import Colors from "@/constants/Colors";

interface CheckBoxProps {
  checked: boolean;
  color?: ColorValue;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelWeight?: Weight;
  labelSize?: number;
  size?: number;
  disabled?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export default function CheckBox({
  checked,
  color = Colors.grey,
  indeterminate = false,
  onChange,
  label,
  labelWeight = "medium",
  labelSize,
  size = 24,
  disabled,
  wrapperStyle,
}: CheckBoxProps) {
  // 체크박스를 눌렀을 때의 동작
  function handlePress() {
    if (disabled) return;
    onChange(!checked);
  }

  // 체크박스 아이콘
  const Icon = React.useCallback(() => {
    if (indeterminate)
      return (
        <MaterialIcons
          color={color}
          name={"indeterminate-check-box"}
          size={size}
        />
      );

    if (checked)
      return <MaterialIcons color={color} name={"check-box"} size={size} />;
    else
      return (
        <MaterialIcons
          color={color}
          name={"check-box-outline-blank"}
          size={size}
        />
      );
  }, [indeterminate, color, size, checked]);

  return (
    <View style={[staticStyles.wrapper, wrapperStyle]}>
      <FeedbackPressable style={staticStyles.checkbox} onPress={handlePress}>
        <View style={staticStyles.iconWrapper}>
          <Icon />
        </View>
      </FeedbackPressable>

      {label && (
        <Pressable onPress={handlePress}>
          <Typography weight={labelWeight} size={labelSize}>
            {label}
          </Typography>
        </Pressable>
      )}
    </View>
  );
}

const staticStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    borderRadius: 5,
  },
  iconWrapper: {
    padding: 5,
  },
});
