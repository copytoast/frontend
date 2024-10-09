import { StatusBar, StyleSheet } from "react-native";

import GreyLogo from "@/assets/vectors/logo_grey.svg";
import AddIcon from "@/assets/vectors/add.svg";
import ListIcon from "@/assets/vectors/list.svg";

import ColumnFlex from "@/components/ColumnFlex";
import Section from "@/components/Section";
import Toast from "@/components/Toast";
import RowFlex from "@/components/RowFlex";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

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
        <RowFlex gap={10} style={styles.quickButtonContainer}>
          <Button
            label={`새 암기빵\n만들기`}
            icon={<AddIcon width={20} height={20} />}
            iconPosition={"right"}
            color={Colors.greyLighter}
            style={styles.quickButton}
            contentStyle={styles.quickButtonContent}
            fontSize={16}
            fontWeight={"medium"}
          />
          <Button
            label={`다른 암기빵\n둘러보기`}
            icon={<ListIcon width={20} height={20} />}
            iconPosition={"right"}
            color={Colors.greyLighter}
            style={styles.quickButton}
            contentStyle={styles.quickButtonContent}
            fontSize={16}
            fontWeight={"medium"}
          />
        </RowFlex>
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
