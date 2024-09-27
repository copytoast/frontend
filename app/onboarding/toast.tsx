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
          암기빵을 담아주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          원하는 암기빵을 골라주세요. 지금 암기빵을 고르지 않고 나중에 나만의
          암기빵을 만들 수도 있어요.
        </Typography>
      </ColumnFlex>

      {/* 하단 */}
      <View>
        <TextField placeholder={"닉네임"} variant={"standard"} />
      </View>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 100,
  },
});
