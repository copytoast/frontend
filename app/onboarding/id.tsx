import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import RowFlex from "@/components/RowFlex";

import EmailIcon from "@/assets/vectors/email.svg";

export default function Id() {
  return (
    <ColumnFlex width={"100%"}>
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          아이디를 정해주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          로그인하거나 친구가 나를 찾을 때 사용하게 될 나만의 고유한 아이디를
          정해주세요.
        </Typography>
      </ColumnFlex>

      {/* 하단 */}
      <RowFlex alignItems={"center"} gap={5} width={"100%"}>
        <EmailIcon width={24} height={24} />
        <TextField
          placeholder={"아이디"}
          variant={"standard"}
          style={styles.textField}
        />
      </RowFlex>
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 100,
  },
  textField: {
    flex: 1,
  },
});
