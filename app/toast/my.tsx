import { ScrollView, StatusBar, StyleSheet } from "react-native";

import ColumnFlex from "@/components/ColumnFlex";
import Pop from "@/components/Pop";
import RowFlex from "@/components/RowFlex";

import Colors from "@/constants/Colors";
import CheckBox from "@/components/CheckBox";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

import EmptyFilterIcon from "@/assets/vectors/filter_empty.svg";

export default function My() {
  return (
    <ScrollView>
      <StatusBar barStyle={"dark-content"} />
      <ColumnFlex style={styles.root}>
        <RowFlex style={styles.header}>
          <RowFlex gap={10}>
            <CheckBox checked onChange={() => {}} />
            <Typography size={16} weight={"medium"} color={Colors.greyDark}>
              총 3개
            </Typography>
          </RowFlex>
          <Button icon={<EmptyFilterIcon width={24} height={24} />} />
        </RowFlex>
        <Pop style={styles.root} visible>
          <></>
        </Pop>
      </ColumnFlex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  header: {
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});
