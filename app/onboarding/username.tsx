import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";

export default function Username() {
  const styles = StyleSheet.create({
    root: {},
    top: {
      marginBottom: 100,
    },
    bottom: {},
  });

  return (
    <ColumnFlex style={styles.root} width={"100%"}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          닉네임을 입력해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          암기빵은 다른 사람과 상호작용할 수 있는 플랫폼이에요.
          {"\n"}
          다른 사람이 보게 될 나의 이름을 정해주세요.
        </Typography>
      </ColumnFlex>

      {/* 하단 */}
      <View style={styles.bottom}></View>
    </ColumnFlex>
  );
}
