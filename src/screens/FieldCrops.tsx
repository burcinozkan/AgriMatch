import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const fieldCrops = [
  {
    id: "1",
    name: "Mısır",
    description: "Taze mısır, organik üretim, doğal yöntemlerle yetiştirilmiş",
    seller: "Ahmet Çiftçi",
    price: "12.50 TL/kg",
  },
  {
    id: "2",
    name: "Buğday",
    description: "Yerli tohum, doğal gübre ile üretilmiş kaliteli buğday",
    seller: "Mehmet Üretici",
    price: "8.75 TL/kg",
  },
  {
    id: "3",
    name: "Arpa",
    description: "Yüksek verimli, kaliteli yem arpası",
    seller: "Ali Yılmaz",
    price: "7.25 TL/kg",
  },
];

export default function FieldCrops() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarla Ürünleri</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={fieldCrops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.sellerName}>{item.seller}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  productCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  favoriteButton: {
    padding: 4,
    justifyContent: "center",
  },
});
