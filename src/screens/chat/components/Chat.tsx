import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatPreview {
  id: string;
  username: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const chatPreviews: ChatPreview[] = [
  {
    id: "1",
    username: "Ahmet Çiftçi",
    lastMessage: "Ürün hala mevcut mu?",
    timestamp: "14:30",
    unread: true,
  },
  {
    id: "2",
    username: "Mehmet Üretici",
    lastMessage: "Fiyatta anlaştık, ne zaman teslim...",
    timestamp: "12:45",
    unread: false,
  },
  {
    id: "3",
    username: "Ayşe Toptancı",
    lastMessage: "Toplu alım için görüşebilir miyiz?",
    timestamp: "Dün",
    unread: true,
  },
];

export default function ChatScreen() {
  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={50} color="#666" />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.messagePreview}>
          <Text
            style={[styles.lastMessage, item.unread && styles.unreadMessage]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <FlatList
        data={chatPreviews}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#888",
  },
  messagePreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: "600",
    color: "#333",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
});
