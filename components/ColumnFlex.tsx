import React from "react";

import {
  StyleSheet,
  View,
  type ViewProps,
  type DimensionValue,
  type FlexStyle,
} from "react-native";

interface ColumnFlexProps extends ViewProps {
  gap?: number;
  height?: DimensionValue;
  width?: DimensionValue;
  flex?: FlexStyle["flex"];
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
}

function ColumnFlex({
  gap,
  height,
  width,
  flex,
  justifyContent,
  alignItems,
  ...props
}: ColumnFlexProps) {
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap,
      height,
      width,
      flex,
      justifyContent,
      alignItems,
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

export default ColumnFlex;
