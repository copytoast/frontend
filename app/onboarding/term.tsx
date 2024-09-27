import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";

export default function Username() {
  return (
    <ColumnFlex width={"100%"}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          모두 완료됐어요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          약관에 모두 동의하면 모든 가입 절차가 끝나요.
        </Typography>
      </ColumnFlex>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 100,
  },
});
