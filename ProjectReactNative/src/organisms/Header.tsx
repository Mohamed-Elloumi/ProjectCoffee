import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface HeaderProps {
  location?: string;
  greeting?: string;
}

export default function Header({ location = "Sfax, Tunisia", greeting = "Good morning, Elloumi" }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/images/avatar.png")}
        style={styles.avatar}
      />

      <View style={styles.headerText}>
        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color="#1B5E20"
          />
          <Text style={styles.location}>{location}</Text>
        </View>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <Ionicons
        name="notifications-outline"
        size={22}
        color="#000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 12,
    color: "#777",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});

