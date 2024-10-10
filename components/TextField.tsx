import React from "react";

import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
  type TextInputProps,
  type DimensionValue,
} from "react-native";

import RowFlex from "@/components/RowFlex";

import Colors from "@/constants/Colors";

type Variant = "outlined" | "standard";

interface TextFieldProps extends TextInputProps {
  variant?: Variant;
  icon?: React.ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
}

function TextField({
  variant = "outlined",
  icon,
  width,
  height,
  selectionColor = Colors.primary,
  ...props
}: TextFieldProps) {
  const [value, setValue] = React.useState(
    props.value ?? props.defaultValue ?? ""
  );

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setValue(e.nativeEvent.text);
    if (props.onChange) props.onChange(e);
  }

  const color = (() => {
    if (props.editable === false) return Colors.greyLight;
    if (value === "") return Colors.greyLight;
    return Colors.grey;
  })();

  // 스타일
  const styles = StyleSheet.create({
    root: {
      width,
      height,
      paddingVertical: 5,
    },
    standardRoot: {},
    outlinedRoot: {
      paddingHorizontal: 5,
      borderRadius: 10,
    },
    textInput: {
      width: "100%",
      height: "100%",
      fontFamily: "PretendardMedium",
      fontSize: 18,
      color,
    },
    icon: {
      width: 24,
      height: 24,
    },
    underline: {
      width: "100%",
      height: 2,
      backgroundColor: color,
      position: "absolute",
      bottom: 0,
    },
  });

  return (
    <RowFlex
      gap={variant === "standard" ? 0 : 10}
      alignItems={"center"}
      style={[
        styles.root,
        props.style,
        variant === "outlined" && styles.outlinedRoot,
        variant === "standard" && styles.standardRoot,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput
        {...props}
        selectionColor={selectionColor}
        style={styles.textInput}
        value={value}
        onChange={handleChange}
      />
      {variant === "standard" && <View style={styles.underline} />}
    </RowFlex>
  );
}

export default TextField;
