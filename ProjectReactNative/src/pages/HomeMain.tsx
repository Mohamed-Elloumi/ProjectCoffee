import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import ScreenTemplate from "../templates/ScreenTemplate";
import Header from "../organisms/Header";
import SearchBar from "../organisms/SearchBar";
import CategoryList from "../organisms/CategoryList";
import ProductList from "../organisms/ProductList";

/* =======================
   DATA
======================= */

const categories = [
  "All",
  "Cappuccino",
  "Coffee",
  "Espresso",
  "Latte",
  "Mocha",
];

const productsData = [
  {
    id: "1",
    title: "Cappuccino",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee1.png"),
    category: "Cappuccino",
  },
  {
    id: "2",
    title: "Coffee",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee2.png"),
    category: "Coffee",
  },
  {
    id: "3",
    title: "Espresso",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee3.png"),
    category: "Espresso",
  },
  {
    id: "4",
    title: "Latte",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee4.png"),
    category: "Latte",
  },
  {
    id: "5",
    title: "Mocha",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee5.png"),
    category: "Mocha",
  },
];

/* =======================
   SCREEN
======================= */

function HomeMainScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  /* ICON LOGIC */
  const getCategoryIcon = (category: string, active: boolean) => {
    if (category === "All") return active ? "apps" : "apps-outline";
    if (category === "Espresso") return active ? "flash" : "flash-outline";
    if (category === "Mocha") return active ? "leaf" : "leaf-outline";
    return active ? "cafe" : "cafe-outline";
  };

  /* FILTER (CATEGORY + SEARCH) */
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchText]);

  const specialOffers = [
    {
      id: "special-1",
      title: "Coffee",
      subtitle: "With Sugar",
      price: "Rp 50.000",
      image: require("../assets/images/coffee4.png"),
    },
    {
      id: "special-2",
      title: "Cappuccino",
      subtitle: "With Sugar",
      price: "Rp 50.000",
      image: require("../assets/images/coffee5.png"),
    },
  ];

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
          emptyMessage="Aucun produit trouvé"
        />

        <ProductList
          products={specialOffers}
          large={true}
          sectionTitle="Special Offer"
        />
      </ScrollView>
    </ScreenTemplate>
  );
}

export default HomeMainScreen;

