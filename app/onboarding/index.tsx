import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.root}>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
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
