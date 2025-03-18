import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  seller: string;
  category: "field" | "packaged";
  isFavorite: boolean;
}

const PRODUCTS: Product[] = [
  // Tarla Ürünleri
  {
    id: "1",
    name: "Mısır",
    description: "Taze mısır, organik üretim, doğal yöntemlerle yetiştirilmiş",
    price: "12 TL/kg",
    location: "Adana",
    seller: "Ahmet Çiftçi",
    category: "field",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Buğday",
    description: "Yerli tohum, doğal gübre ile yetiştirilmiş kaliteli buğday",
    price: "8 TL/kg",
    location: "Konya",
    seller: "Mehmet Üretici",
    category: "field",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Domates",
    description: "Taze sera domatesi, hormonsuz üretim",
    price: "15 TL/kg",
    location: "Antalya",
    seller: "Ayşe Hanım",
    category: "field",
    isFavorite: false,
  },
  // Paketli Ürünler
  {
    id: "4",
    name: "Zeytinyağı",
    description: "Soğuk sıkım naturel sızma zeytinyağı",
    price: "250 TL/L",
    location: "Ayvalık",
    seller: "Zeytinci Ahmet",
    category: "packaged",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Bal",
    description: "Organik çiçek balı, katkısız",
    price: "300 TL/kg",
    location: "Muğla",
    seller: "Arı Bahçesi",
    category: "packaged",
    isFavorite: false,
  },
];

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<"field" | "packaged">("field");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filtrelenmiş ürünleri memoize et
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => product.category === selectedTab);
  }, [selectedTab]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleTabPress = (tab: "field" | "packaged") => {
    setSelectedTab(tab);
  };

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => {
        // Ürün detay sayfasına yönlendirme eklenecek
        // router.push(`/product/${product.id}`);
      }}
    >
      <View style={styles.productImagePlaceholder} />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.productFooter}>
          <View style={styles.sellerInfo}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.locationText}>{product.location}</Text>
            <Text style={styles.sellerName}>{product.seller}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(product.id)}
          >
            <Ionicons
              name={favorites.has(product.id) ? "heart" : "heart-outline"}
              size={24}
              color={favorites.has(product.id) ? "#FF4444" : "#666"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AgriMatch</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "field" && styles.selectedTab]}
            onPress={() => handleTabPress("field")}
          >
            <Text style={styles.tabText}>Tarla Ürünleri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "packaged" && styles.selectedTab,
            ]}
            onPress={() => handleTabPress("packaged")}
          >
            <Text style={styles.tabText}>Paketli Ürünler</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.productList}>
          {filteredProducts.map(renderProductCard)}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: "#f0f0f0",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  productList: {
    flex: 1,
  },
  productCard: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  sellerName: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  favoriteButton: {
    padding: 4,
  },
});
