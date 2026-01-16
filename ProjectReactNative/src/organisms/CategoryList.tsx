import { Text, ScrollView, StyleSheet } from "react-native";
import Category from "../molecules/Category";

interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onCategoryPress: (category: string) => void;
  getCategoryIcon: (category: string, active: boolean) => string;
  sectionTitle?: string;
}

export default function CategoryList({
  categories,
  activeCategory,
  onCategoryPress,
  getCategoryIcon,
  sectionTitle = "Categories",
}: CategoryListProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Category
              key={cat}
              title={cat}
              icon={getCategoryIcon(cat, isActive)}
              active={isActive}
              onPress={() => onCategoryPress(cat)}
            />
          );
        })}
      </ScrollView>
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
  categories: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 24,
  },
});

