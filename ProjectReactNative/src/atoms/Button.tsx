import { StyleProp, TouchableOpacity, ViewStyle, Text, TextStyle } from "react-native";

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          height: 48,
          backgroundColor: "#DDDDDD",
          width: "100%",
          borderRadius: 8,
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text style={[{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }, props.textStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

