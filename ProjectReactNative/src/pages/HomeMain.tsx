import React, { useMemo, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

import ScreenTemplate from "../templates/ScreenTemplate";
import Header from "../organisms/Header";
import SearchBar from "../organisms/SearchBar";
import CategoryList from "../organisms/CategoryList";
import ProductList from "../organisms/ProductList";
import { API_URL } from "../config";

/* =======================
   SCREEN
======================= */

function HomeMainScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive categories from product data
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  /* ICON LOGIC */
  const getCategoryIcon = (category: string, active: boolean) => {
    const iconName = active ? 'cafe' : 'cafe-outline';
    if (category === "All") return active ? "apps" : "apps-outline";
    if (category.includes("Petit Déjeuner")) return active ? "restaurant" : "restaurant-outline";
    if (category.includes("Cafés")) return active ? "cafe" : "cafe-outline";
    if (category.includes("Jus")) return active ? "water" : "water-outline";
    if (category.includes("Smoothies")) return active ? "ice-cream" : "ice-cream-outline";
    if (category.includes("Crêpes")) return active ? "pizza" : "pizza-outline";
    if (category.includes("Salée")) return active ? "fast-food" : "fast-food-outline";
    if (category.includes("Chicha")) return active ? "flame" : "flame-outline";
    return iconName;
  };

  /* FILTER (CATEGORY + SEARCH) */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchText, products]);

  const specialOffers = useMemo(() => {
    // Products with isSpecial or in Breakfast category
    return products.filter(p => p.isSpecial === 1 || p.category === "Petit Déjeuner");
  }, [products]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00512C" />
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Header />

        <SearchBar value={searchText} onChangeText={setSearchText} />

        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onCategoryPress={setActiveCategory}
          getCategoryIcon={getCategoryIcon}
        />

        <ProductList
          products={filteredProducts}
          emptyMessage="No items found"
        />

        {specialOffers.length > 0 && activeCategory === "All" && (
          <ProductList
            products={specialOffers.slice(0, 4)}
            large={true}
            sectionTitle="Special Offers / Breakfast"
          />
        )}
      </ScrollView>
    </ScreenTemplate>
  );
}

export default HomeMainScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
