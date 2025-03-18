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
import { signIn, getCurrentUser } from "aws-amplify/auth";
import { useRouter, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log("Aktif oturum bulundu:", currentUser);
      router.replace("/(tabs)");
    } catch (error) {
      console.log("Aktif oturum yok, giriş gerekli");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!email) {
      Alert.alert("Hata", "Email adresinizi giriniz");
      return false;
    }
    if (!password) {
      Alert.alert("Hata", "Şifre girmelisiniz");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    console.log("Giriş denemesi başlıyor:", email);
    setLoading(true);
    try {
      console.log("SignIn çağrısı yapılıyor...");
      const signInResponse = await signIn({
        username: email,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      console.log("Giriş başarılı:", signInResponse);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Giriş hatası detayları:", {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      let errorMessage = "Bir hata oluştu";

      if (error.message === "Incorrect username or password.") {
        errorMessage = "Email veya şifre hatalı";
      } else if (error.message === "User is not confirmed.") {
        errorMessage = "Email adresinizi doğrulamadınız";
        router.push({
          pathname: "/(auth)/confirm",
          params: { email },
        });
        return;
      } else if (error.message?.includes("User does not exist")) {
        errorMessage = "Bu email adresi ile kayıtlı kullanıcı bulunamadı";
      }

      Alert.alert("Hata", `${errorMessage}\n\nHata detayı: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Oturum kontrol ediliyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giriş Yap</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>

        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Hesabın yok mu? Kayıt ol</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Şifremi unuttum</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
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
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 16,
  },
});
