import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../services/cartService";
import { UPLOADS_URL } from "../config";

interface ProductCardProps {
  id?: string | number;
  title: string;
  subtitle: string;
  price: string;
  image: any;
  large?: boolean;
}

export default function ProductCard({ title, subtitle, price, image, large }: ProductCardProps) {
  const navigation: any = useNavigation();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    isFavorite(title).then(setLiked);
  }, [title]);

  const toggleFavorite = async () => {
    if (liked) {
      await removeFavorite(title);
      setLiked(false);
    } else {
      await addFavorite({ title, subtitle, price, image });
      setLiked(true);
    }
  };

  // Logic to determine if image is a remote URL or a local require
  const getImageSource = () => {
    if (typeof image === 'string') {
      // If it's a string, it's a filename from our backend
      if (image.includes('http')) return { uri: image };
      return { uri: `${UPLOADS_URL}/${image}` };
    }
    return image; // Fallback to local require if it's a number/object
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          title,
          subtitle,
          price,
          image,
        })
      }
    >
      <View style={[styles.card, large && styles.large]}>
        {/* ❤️ Favorite Button */}
        <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color="#C62828"
          />
        </TouchableOpacity>

        <Image
          source={getImageSource()}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart({ title, subtitle, price, image })}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    elevation: 4,
    marginRight: 16,
    marginBottom: 16,
  },
  large: { width: 220 },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f0f0f0'
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 4
  },
  title: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  subtitle: { fontSize: 12, color: "#777", marginBottom: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 14, fontWeight: "700", color: "#C67C4E" },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#00512C",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#FFF", fontSize: 20, fontWeight: "700" },
});
