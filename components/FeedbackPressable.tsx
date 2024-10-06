import React from "react";

import {
  Animated,
  Pressable,
  Easing,
  type PressableProps,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import isDarkColor from "@/utility/isDarkColor";

type Component = "root" | "content";

interface FeedbackPressableProps extends PressableProps {
  color?: string;
  contentStyle?: StyleProp<ViewStyle>;
  scaleComponent?: Component;
  colorComponent?: Component;
  style: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function FeedbackPressable({
  children,
  color = "#00000000",
  style,
  contentStyle,
  disabled,
  scaleComponent = "root",
  colorComponent = "root",
  ...props
}: FeedbackPressableProps) {
  const [width, setWidth] = React.useState(0);

  const animated = React.useRef(new Animated.Value(0)).current;

  const isBackgroundColorDark = isDarkColor(color);
  const scaleRatio = width < 30 ? 1 : 0.95;

  function handlePressIn(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    props.onPressIn?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    if (!disabled)
      Animated.timing(animated, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    props.onPressOut?.(event);
  }

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
    props.onLayout?.(event);
  }

  const dynamicStyles = {
    color: {
      backgroundColor: animated.interpolate({
        inputRange: [0, isBackgroundColorDark ? 5 : 7],
        outputRange: [color, isBackgroundColorDark ? "#FFFFFF" : "#000000"],
      }),
    },
    scale: {
      transform: [
        {
          scale: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, scaleRatio],
          }),
        },
      ],
    },
  };

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={[
        ...(scaleComponent === "root" ? [dynamicStyles.scale] : []),
        ...(colorComponent === "root" ? [dynamicStyles.color] : []),
        style,
      ]}
    >
      <Animated.View
        style={[
          ...(scaleComponent === "content" ? [dynamicStyles.scale] : []),
          ...(colorComponent === "content" ? [dynamicStyles.color] : []),
          ,
          contentStyle,
        ]}
      >
        <>{children}</>
      </Animated.View>
    </AnimatedPressable>
  );
}

export default FeedbackPressable;
