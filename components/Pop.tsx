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
  const [ready, setReady] = React.useState(true);
  const animated = React.useRef<Record<string, Animated.Value>>({});

  React.useEffect(() => {
    if (visible && ready)
      Object.keys(animated.current).forEach((key, index) => {
        animated.current[key].setValue(0);
        Animated.timing(animated.current[key], {
          toValue: 1,
          duration: 300,
          delay: index * 50,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
    else if (!visible) {
      setReady(false);
      Object.keys(animated.current).forEach((key) => {
        Animated.timing(animated.current[key], {
          toValue: 2,
          duration: 150,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished) return;
          setReady(true);
        });
      });
    }
  }, [visible, ready]);

  function getStyle(key: string) {
    if (!(key in animated.current))
      animated.current[key] = new Animated.Value(2);
    const aniamtedValue = animated.current[key];

    return {
      opacity: aniamtedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      }),
      transform: [
        {
          translateY: aniamtedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [50, 0, 0],
          }),
        },
        {
          scale: aniamtedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 1, 0.9],
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
