import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import TextField from "@/components/TextField";

export default function Username() {
  return (
    <ColumnFlex width={"100%"}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          이름을 입력해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          암기빵은 다른 사람과 상호작용할 수 있는 플랫폼이에요. 다른 사람이 보게
          될 나의 이름을 정해주세요.
        </Typography>
      </ColumnFlex>

      {/* 하단 */}
      <View>
        <TextField placeholder={"이름"} variant={"standard"} />
      </View>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 100,
  },
});
