import { StyleProp, TextInput, TextStyle, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  style?: StyleProp<TextStyle>;
}

function Input(props: InputProps) {
  const { style, ...otherProps } = props;
  return (
    <TextInput
      style={[
        {
          width: "100%",
          height: 48,
          borderColor: "#EAEAEA",
          borderWidth: 2,
          borderRadius: 8,
          backgroundColor: "#FFF",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export default Input;

