import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Section from "@/components/Section";

import GreyLogo from "@/assets/vectors/logo_grey.svg";

export default function Home() {
  return (
    <ColumnFlex style={styles.root}>
      <Section
        title="암기빵"
        titleIcon={<GreyLogo width={20} height={20} />}
        titleArrowVisible
      >
        <ColumnFlex />
      </Section>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
