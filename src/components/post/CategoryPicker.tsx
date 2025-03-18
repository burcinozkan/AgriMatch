import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryPickerProps {
  value: string;
  onPress: () => void;
}

export default function CategoryPicker({
  value,
  onPress,
}: CategoryPickerProps) {
  return (
    <TouchableOpacity style={styles.dropdown} onPress={onPress}>
      <Text style={styles.dropdownText}>{value || "Kategori seçin"}</Text>
      <Ionicons name="chevron-down" size={20} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#666",
  },
});
