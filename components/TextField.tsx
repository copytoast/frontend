import React from "react";

import {
  View,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
  type TextInputProps,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
  type TextInputFocusEventData,
} from "react-native";

import Colors from "@/constants/Colors";

import shadeColor from "@/utility/shadeColor";

type TextFieldVariant = "outlined" | "standard";

interface TextFieldProps extends TextInputProps {
  variant?: TextFieldVariant;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function TextField({
  variant = "outlined",
  icon,
  selectionColor = Colors.primary,
  editable,
  ...props
}: TextFieldProps) {
  const [value, setValue] = React.useState(
    props.value ?? props.defaultValue ?? ""
  );
  const [focus, setFocus] = React.useState(props.autoFocus ?? false);

  const dynamicStyles = getDynamicStyles({
    variant,
    focus,
    editable: editable ?? true,
  });

  // 수정 핸들러
  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setValue(e.nativeEvent.text);
    props.onChange?.(e);
  }

  // 포커스 핸들러
  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocus(true);
    props.onFocus?.(e);
  }

  // 포커스 해제 핸들러
  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocus(false);
    props.onBlur?.(e);
  }

  return (
    <View
      style={[
        staticStyles.root,
        dynamicStyles.root,
        variant === "outlined" && staticStyles.outlinedRoot,
        variant === "standard" && staticStyles.standardRoot,
        props.style,
      ]}
    >
      {icon && <View style={staticStyles.icon}>{icon}</View>}
      <TextInput
        {...props}
        selectionColor={selectionColor}
        style={[staticStyles.textInput, dynamicStyles.textInput]}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
      />
      {variant === "standard" && (
        <View style={[staticStyles.underline, dynamicStyles.underline]} />
      )}
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    alignItems: "center",
  },
  standardRoot: {},
  outlinedRoot: {
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  textInput: {
    width: "100%",
    fontFamily: "PretendardMedium",
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  underline: {
    width: "100%",
    height: 2,
    position: "absolute",
    bottom: 0,
  },
});

interface DynamicStylesProps {
  variant: TextFieldVariant;
  focus: boolean;
  editable: boolean;
}

const getDynamicStyles = (props: DynamicStylesProps) => {
  const originalColor = Colors.grey;
  const fontColor = !props.editable
    ? shadeColor(originalColor, 50)
    : originalColor;
  const lineColor = !props.editable
    ? shadeColor(originalColor, 50)
    : props.focus
    ? Colors.primary
    : originalColor;

  return {
    root: {
      gap: props.variant === "standard" ? 0 : 10,
    },
    textInput: {
      color: fontColor,
    },
    underline: {
      backgroundColor: lineColor,
    },
  };
};
