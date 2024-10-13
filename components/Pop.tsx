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
  // key 값이 있는 자식 컴포넌트만 추출
  const validElements = (
    React.Children.toArray(children) as React.ReactElement[]
  ).filter((child): child is ReactElementWithKey => child.key !== null);

  // validElements의 key들과 대응되는 애니메이션 값들을 저장
  const animated = React.useRef<Record<string, Animated.Value>>({});

  const [ready, setReady] = React.useState(true);

  // visible 값이 변경될 때마다 애니메이션을 실행
  React.useEffect(() => {
    if (visible && ready) {
      // 등장 애니메이션
      const animations = Object.keys(animated.current).map((key, index) => {
        animated.current[key].setValue(0);
        return Animated.timing(animated.current[key], {
          toValue: 1,
          duration: 300,
          delay: index * 50,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        });
      });

      Animated.parallel(animations).start();
    } else if (!visible) {
      // 퇴장 애니메이션
      const animations = Object.keys(animated.current).map((key) => {
        return Animated.timing(animated.current[key], {
          toValue: 2,
          duration: 150,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        });
      });

      setReady(false);
      Animated.parallel(animations).start(({ finished }) => {
        if (!finished) return;
        setReady(true);
      });
    }
  }, [visible, ready]);

  // key 값에 따라 애니메이션 스타일을 가져오는 함수
  function getStyle(key: string) {
    // key 값에 대응되는 애니메이션 값이 없으면 새로 생성
    if (!(key in animated.current))
      animated.current[key] = new Animated.Value(2);
    const aniamtedValue = animated.current[key];

    return getDynamicStyles({ aniamtedValue });
  }

  return (
    <View style={style}>
      {validElements.map((element) => (
        <Animated.View key={element.key} style={getStyle(element.key)}>
          {element}
        </Animated.View>
      ))}
    </View>
  );
}

interface DynamicStylesProps {
  aniamtedValue: Animated.Value;
}

const getDynamicStyles = (props: DynamicStylesProps) => ({
  opacity: props.aniamtedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  }),
  transform: [
    {
      translateY: props.aniamtedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [50, 0, 0],
      }),
    },
    {
      scale: props.aniamtedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0.9],
      }),
    },
  ],
});
