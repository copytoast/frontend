import { StyleSheet, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";

export default function Index() {
  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    root: {
      paddingTop: headerHeight,
      backgroundColor: Colors.white,
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    top: {
      padding: 20,
    },
    content: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      paddingTop: 120,
      gap: 20,
    },
    bottom: {
      position: "absolute",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      bottom: 0,
      padding: 20,
      gap: 10,
    },
  });

  return (
    <View style={styles.root}>
      {/* 상단 */}
      <View style={styles.top}>
        <ProgressBar steps={["닉네임", "아이디", "빵 담기"]} currentStep={0} />
      </View>

      {/* 콘텐츠 */}
      <View style={styles.content}></View>

      {/* 하단 */}
    </View>
  );
}
