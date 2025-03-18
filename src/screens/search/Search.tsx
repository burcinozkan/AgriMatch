import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const filterOptions: { title: string; icon: IconName }[] = [
  {
    title: "Yayın Tarihi",
    icon: "calendar-outline",
  },
  {
    title: "Konum",
    icon: "location-outline",
  },
  {
    title: "Ürün Tipi",
    icon: "leaf-outline",
  },
  {
    title: "İlaçlama",
    icon: "water-outline",
  },
  {
    title: "Arazi Alanı",
    icon: "map-outline",
  },
  {
    title: "Hasat Zamanı",
    icon: "time-outline",
  },
];

const renderFilterContent = (filterTitle: string | null) => {
  switch (filterTitle) {
    case "Yayın Tarihi":
      return (
        <View>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Son 24 Saat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Son 1 Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Son 1 Ay</Text>
          </TouchableOpacity>
        </View>
      );

    case "Konum":
      return (
        <View>
          <TextInput
            style={styles.filterInput}
            placeholder="Şehir veya ilçe ara..."
          />
          <TouchableOpacity style={styles.filterOption}>
            <Text>Konumumu Kullan</Text>
          </TouchableOpacity>
        </View>
      );

    case "Ürün Tipi":
      return (
        <View>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Tarla Ürünleri</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Paketli Ürünler</Text>
          </TouchableOpacity>
        </View>
      );

    case "İlaçlama":
      return (
        <View>
          <TouchableOpacity style={styles.filterOption}>
            <Text>İlaçlı</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>İlaçsız</Text>
          </TouchableOpacity>
        </View>
      );

    case "Arazi Alanı":
      return (
        <View>
          <View style={styles.rangeInputContainer}>
            <TextInput
              style={styles.rangeInput}
              placeholder="Min (Dönüm)"
              keyboardType="numeric"
            />
            <Text>-</Text>
            <TextInput
              style={styles.rangeInput}
              placeholder="Max (Dönüm)"
              keyboardType="numeric"
            />
          </View>
        </View>
      );

    case "Hasat Zamanı":
      return (
        <View>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Bu Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Bu Ay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text>Gelecek 3 Ay</Text>
          </TouchableOpacity>
        </View>
      );

    default:
      return <Text>Lütfen bir filtre seçin</Text>;
  }
};

export default function SearchScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterPress = (filterTitle: string) => {
    setSelectedFilter(filterTitle);
    setShowFilterModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Ara..."
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.browseTitle}>Filtreleme</Text>

      <ScrollView style={styles.filterList}>
        {filterOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterItem,
              selectedFilter === option.title && styles.selectedFilterItem,
            ]}
            onPress={() => handleFilterPress(option.title)}
          >
            <View style={styles.filterItemContent}>
              <Ionicons name={option.icon} size={22} color="#666" />
              <Text style={styles.filterItemText}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedFilter}</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              {renderFilterContent(selectedFilter)}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => setShowFilterModal(false)}
                >
                  <Text style={styles.applyButtonText}>Uygula</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  browseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 16,
    marginBottom: 8,
  },
  filterList: {
    flex: 1,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedFilterItem: {
    backgroundColor: "#f8f8f8",
  },
  filterItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalBody: {
    padding: 16,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  rangeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  rangeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  modalFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  applyButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
