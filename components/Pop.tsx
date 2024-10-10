import React from "react";
import {
  View,
  Animated,
  Easing,
  type StyleProp,
  type ViewStyle,
} from "react-native";

interface PopProps {
  visible: boolean;
  children: React.ReactElement | React.ReactElement[];
  style?: StyleProp<ViewStyle>;
}

interface ReactElementWithKey extends React.ReactElement {
  key: string;
}

export default function Pop({ visible, children, style }: PopProps) {
  const elements = (
    React.Children.toArray(children) as React.ReactElement[]
  ).filter((child): child is ReactElementWithKey => child.key !== null);
  const animated = React.useRef<Record<string, Animated.Value>>({});

  React.useEffect(() => {
    if (visible)
      Object.keys(animated.current).forEach((key, index) => {
        Animated.timing(animated.current[key], {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
    else
      Object.keys(animated.current).forEach((key) => {
        Animated.timing(animated.current[key], {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
  }, [visible]);

  function getStyle(key: string) {
    if (!(key in animated.current))
      animated.current[key] = new Animated.Value(0);
    const aniamtedValue = animated.current[key];

    return {
      opacity: aniamtedValue,
      transform: [
        {
          translateY: aniamtedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };
  }

  return (
    <View style={style}>
      {elements.map((element) => (
        <Animated.View key={element.key} style={getStyle(element.key)}>
          {element}
        </Animated.View>
      ))}
    </View>
  );
}
