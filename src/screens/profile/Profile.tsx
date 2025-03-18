import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type MenuItem = {
  id: string;
  title: string;
  icon: "list" | "megaphone" | "heart" | "settings" | "help-circle";
  route: string;
};

const menuItems: MenuItem[] = [
  { id: "1", title: "My Orders", icon: "list", route: "my-orders" },
  { id: "2", title: "My Adverts", icon: "megaphone", route: "my-adverts" },
  { id: "3", title: "Favorites", icon: "heart", route: "favorites" },
  { id: "4", title: "Account Settings", icon: "settings", route: "settings" },
  { id: "5", title: "Support", icon: "help-circle", route: "support" },
];

export default function Profile() {
  const handleMenuPress = (route: string) => {
    try {
      router.push(`/(tabs)/${route}` as any);
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>BO</Text>
        </View>
        <Text style={styles.userName}>Burcin Ozkan</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.route)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#495057",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#212529",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#FF3B30",
  },
});
