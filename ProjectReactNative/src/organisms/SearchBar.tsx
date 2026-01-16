import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ placeholder = "Search Coffee ...", value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.searchBox}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: "center",
    marginBottom: 24,
  },
  searchInput: {
    fontSize: 14,
  },
});

