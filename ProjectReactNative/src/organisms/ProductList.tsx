import { ScrollView, StyleSheet, Text } from "react-native";
import ProductCard from "../molecules/ProductCard";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: any;
  category?: string;
}

interface ProductListProps {
  products: Product[];
  emptyMessage?: string;
  large?: boolean;
  sectionTitle?: string;
}

export default function ProductList({
  products,
  emptyMessage = "Aucun produit trouvé",
  large = false,
  sectionTitle,
}: ProductListProps) {
  return (
    <>
      {sectionTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
      {products.length === 0 ? (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.products}
        >
          {products.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              image={item.image}
              large={large}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  emptyText: {
    color: "#777",
    marginBottom: 16,
  },
  products: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 32,
  },
});

