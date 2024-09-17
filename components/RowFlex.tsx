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
  flex?: FlexStyle["flex"];
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
}

function RowFlex({
  gap,
  height,
  width,
  flex,
  justifyContent,
  alignItems,
  ...props
}: RowFlexProps) {
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      gap,
      height,
      width,
      flex,
      justifyContent,
      alignItems,
    },
  });

  return <View {...props} style={[styles.root, props.style]} />;
}

export default RowFlex;
