import { StatusBar, StyleSheet } from "react-native";

import ColumnFlex from "@/components/ColumnFlex";
import MyToastSection from "@/components/home/MyToastSection";

export default function Home() {
  return (
    <ColumnFlex style={styles.root}>
      <StatusBar barStyle={"dark-content"} />
      <MyToastSection />
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sectionContent: {
    padding: 5,
    paddingTop: 0,
  },
  quickButtonContainer: {
    padding: 10,
  },
  quickButton: {
    flex: 1,
  },
  quickButtonContent: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 15,
  },
});
