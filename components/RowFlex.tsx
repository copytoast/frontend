import React from "react";

import {
  StyleSheet,
  View,
  type ViewProps,
  type DimensionValue,
  type FlexStyle,
} from "react-native";

interface RowFlexProps extends ViewProps {
  gap?: number;
  height?: DimensionValue;
  width?: DimensionValue;
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
}

function RowFlex({
  gap,
  height,
  width,
  justifyContent,
  alignItems,
  ...props
}: RowFlexProps) {
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      gap: gap,
      height: height,
      width: width,
      justifyContent: justifyContent,
      alignItems: alignItems,
    },
  });

  return (
    <View
      {...props}
      style={[
        styles.root,
        Array.isArray(props.style) ? props.style : [props.style],
      ]}
    />
  );
}

export default RowFlex;
