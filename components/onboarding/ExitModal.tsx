import { StyleSheet, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ModalFrame from "@/components/ModalFrame";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

import Colors from "@/constants/Colors";

interface ExitModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ExitModal({
  visible,
  onCancel,
  onConfirm,
}: ExitModalProps) {
  const buttons = (
    <>
      <Button
        label={"가입 취소"}
        backgroundColor={Colors.grey}
        onPress={onCancel}
        style={staticStyles.button}
      />

      <Button
        label={"계속 가입"}
        backgroundColor={Colors.primary}
        icon={
          <MaterialIcons
            name={"arrow-forward"}
            size={24}
            color={Colors.white}
          />
        }
        onPress={onConfirm}
        style={staticStyles.button}
      />
    </>
  );

  return (
    <ModalFrame visible={visible} buttons={buttons}>
      <View style={staticStyles.content}>
        <Typography size={20} weight={"bold"}>
          가입을 취소할까요? 😥
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          지금 가입을 취소하면 소셜 아이디로 다시 로그인해야 돼요.
        </Typography>
      </View>
    </ModalFrame>
  );
}

const staticStyles = StyleSheet.create({
  content: {
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
  },
});
