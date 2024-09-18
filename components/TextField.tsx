import React from "react";

import { StyleSheet, TextInput, type TextInputProps, View } from "react-native";

import Typography from "@/components/Typography";
import RowFlex from "@/components/RowFlex";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

type Variant = "outlined" | "standard";

interface TextFieldProps extends TextInputProps {
  variant?: Variant;
}

function TextField({ variant = "outlined", ...props }: TextFieldProps) {
  // 스타일
  const styles = StyleSheet.create({
    root: {
      fontFamily: "PretendardMedium",
    },
  });

  return <TextInput {...props} style={[props.style, styles.root]}></TextInput>;
}

export default TextField;
