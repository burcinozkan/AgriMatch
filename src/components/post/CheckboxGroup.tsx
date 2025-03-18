import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  onToggle: (id: string) => void;
}

export default function CheckboxGroup({
  options,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.checkboxRow}
          onPress={() => onToggle(option.id)}
        >
          <View
            style={[styles.checkbox, option.checked && styles.checkboxChecked]}
          >
            {option.checked && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
});
