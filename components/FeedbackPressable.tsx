import React from "react";

import {
  Animated,
  Easing,
  Pressable,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
  StyleSheet,
} from "react-native";

import isDarkColor from "@/utility/isDarkColor";

export interface FeedbackPressableProps
  extends React.ComponentProps<typeof AnimatedPressable> {
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default function FeedbackPressable({
  backgroundColor = "#00000000",
  children,
  disabled,
  style,
  onPressIn,
  onPressOut,
  ...props
}: FeedbackPressableProps) {
  const [width, setWidth] = React.useState(0);

  const animated = React.useRef(new Animated.Value(0)).current;

  const dynamicStyles = getDynamicStyles({
    animated,
    backgroundColor,
    scaleRatio: width < 30 ? 1 : 0.95,
  });

  // Pressable 컴포넌트의 onPressIn 이벤트 핸들러
  function handlePressIn(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    onPressIn?.(event);
  }

  // Pressable 컴포넌트의 onPressOut 이벤트 핸들러
  function handlePressOut(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    onPressOut?.(event);
  }

  // Pressable 컴포넌트의 onLayout 이벤트 핸들러
  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
    props.onLayout?.(event);
  }

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={[staticStyle.wrapper, dynamicStyles.wrapper, style]}
      children={children}
    />
  );
}

const staticStyle = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

interface DynamicStylesProps {
  animated: Animated.Value;
  backgroundColor: string;
  scaleRatio: number;
}

const getDynamicStyles = (props: DynamicStylesProps) => {
  const isBackgroundColorDark = isDarkColor(props.backgroundColor);

  return {
    wrapper: {
      backgroundColor: props.animated.interpolate({
        inputRange: [0, isBackgroundColorDark ? 5 : 7],
        outputRange: [
          props.backgroundColor,
          isBackgroundColorDark ? "#FFFFFF" : "#000000",
        ],
      }),
      transform: [
        {
          scale: props.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, props.scaleRatio],
          }),
        },
      ],
    },
  };
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
