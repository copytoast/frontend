import { StatusBar, StyleSheet } from "react-native";

import ColumnFlex from "@/components/ColumnFlex";

import Colors from "@/constants/Colors";

export default function My() {
  return (
    <ColumnFlex style={styles.root}>
      <StatusBar barStyle={"dark-content"} />
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});
