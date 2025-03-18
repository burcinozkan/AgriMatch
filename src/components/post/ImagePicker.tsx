import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ImagePickerProps {
  onPress: (index: number) => void;
  count?: number;
}

export default function ImagePicker({ onPress, count = 3 }: ImagePickerProps) {
  return (
    <View style={styles.imageGrid}>
      {Array(count)
        .fill("")
        .map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={() => onPress(index)}
          >
            <Ionicons name="add" size={32} color="#666" />
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: "row",
    gap: 8,
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
});
