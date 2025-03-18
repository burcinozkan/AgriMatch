import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmScreen() {
  const { email: routeEmail } = useLocalSearchParams<{ email: string }>();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (routeEmail) {
      setEmail(routeEmail);
    }
  }, [routeEmail]);

  const handleConfirm = async () => {
    if (!email || !code) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      Alert.alert("Başarılı", "E-posta adresiniz doğrulandı.", [
        {
          text: "Tamam",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert("Hata", "Lütfen e-posta adresinizi girin.");
      return;
    }

    setResending(true);
    try {
      await resendSignUpCode({
        username: email,
      });
      Alert.alert("Başarılı", "Yeni doğrulama kodu gönderildi.");
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-posta Doğrulama</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          {email} adresine gönderilen doğrulama kodunu girin.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!routeEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Doğrulama Kodu"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Doğrula</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resendButton, resending && styles.buttonDisabled]}
          onPress={handleResendCode}
          disabled={resending}
        >
          {resending ? (
            <ActivityIndicator color="#4CAF50" />
          ) : (
            <Text style={styles.resendText}>Kodu Tekrar Gönder</Text>
          )}
        </TouchableOpacity>
      </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    marginTop: 20,
    padding: 15,
  },
  resendText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 16,
  },
});
