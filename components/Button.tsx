import React from "react";

import {
  Animated,
  StyleSheet,
  Pressable,
  View,
  Easing,
  type PressableProps,
  type DimensionValue,
  type ViewStyle,
  type StyleProp,
  type GestureResponderEvent,
} from "react-native";

import Typography, { type Weight } from "@/components/Typography";

import Colors from "@/constants/Colors";

import isDarkColor from "@/utility/isDarkColor";

type IconPosition = "left" | "right";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  fontWeight?: Weight;
  fontSize?: number;
  color?: string;
  icon?: React.ReactNode;
  iconSize?: DimensionValue;
  iconPosition?: IconPosition;
  contentStyle?: StyleProp<ViewStyle>;
}

function Button({
  label,
  fontWeight = "regular",
  color = "#00000000",
  fontSize,
  icon,
  iconSize,
  iconPosition = "left",
  disabled,
  style,
  contentStyle,
  ...props
}: ButtonProps) {
  const animated = React.useRef(new Animated.Value(0)).current;

  const backgroundColor = disabled ? Colors.greyLight : color;
  const isBackgroundColorDark = isDarkColor(backgroundColor);

  function onPressIn(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    props.onPressIn?.(event);
  }

  function onPressOut(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    props.onPressOut?.(event);
  }

  const dynamicStyles = {
    icon: {
      width: iconSize,
      height: iconSize,
    },
    content: {
      backgroundColor: animated.interpolate({
        inputRange: [0, isBackgroundColorDark ? 5 : 7],
        outputRange: [
          backgroundColor,
          isBackgroundColorDark ? "#FFFFFF" : "#000000",
        ],
      }),
      transform: [
        {
          scale: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.95],
          }),
        },
      ],
    },
  };

  const iconComponent = <View style={dynamicStyles.icon}>{icon}</View>;

  return (
    <Pressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [
        styles.root,
        style instanceof Function ? style({ pressed }) : style,
      ]}
    >
      <Animated.View
        style={[styles.content, dynamicStyles.content, contentStyle]}
      >
        {icon && iconPosition === "left" && iconComponent}
        <Typography
          size={fontSize}
          color={isBackgroundColorDark ? Colors.white : Colors.greyDark}
          weight={fontWeight}
        >
          {label}
        </Typography>
        {icon && iconPosition === "right" && iconComponent}
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
  },
  content: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
});

export default Button;
