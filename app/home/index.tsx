import { StatusBar, StyleSheet } from "react-native";

import ColumnFlex from "@/components/ColumnFlex";
import Section from "@/components/Section";

import GreyLogo from "@/assets/vectors/logo_grey.svg";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <ColumnFlex style={styles.root}>
      <StatusBar barStyle={"dark-content"} />
      <Section
        title="내가 담은 암기빵"
        titleIcon={<GreyLogo width={20} height={20} />}
        titleArrowVisible
      >
        <ColumnFlex style={styles.sectionContent}>
          <Toast
            name="수능 영단어 1,000선"
            description="대학수학능력시험 영어 영역에 빈출되는 영단어 1,000개를 모아놓았어요."
            like={10}
            added
            my
            detailButtonVisible
          />
        </ColumnFlex>
      </Section>
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
});
