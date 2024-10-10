import { ScrollView, StatusBar, StyleSheet } from "react-native";

import Pop from "@/components/Pop";
import MyToastSection from "@/components/home/MyToastSection";

export default function Home() {
  return (
    <ScrollView>
      <StatusBar barStyle={"dark-content"} />
      <Pop style={styles.root} visible>
        <MyToastSection key="toast_section" />
      </Pop>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
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
