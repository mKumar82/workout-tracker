import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { loginUser, registerUser, validateUser } from "../utils/storage";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  const { isDarkMode, toggleTheme } = useTheme();

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required.");
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        Alert.alert("Validation Error", "Passwords do not match.");
        return;
      }
      registerUser(email, password);
      loginUser(email);
      router.replace("/");
    } else {
      if (validateUser(email, password)) {
        loginUser(email);
        router.replace("/");
      } else {
        Alert.alert("Login Failed", "Incorrect email or password.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      {/* theme toggle btn */}
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? "#fff" : "#000"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
      <Text style={[styles.title, { color: colors.text }]}>
        {isSignUp ? "Create Account" : "Welcome Back"}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        {isSignUp
          ? "Sign up with your email and password"
          : "Sign in with your email and password"}
      </Text>

      {/* email */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
            color: colors.text,
          },
        ]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* password */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
            color: colors.text,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* confirm password */}
      {isSignUp && (
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.inputBorder,
              color: colors.text,
            },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor={colors.placeholder}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <Button title={isSignUp ? "Sign Up" : "Sign In"} onPress={handleAuth} />

      {/* create account */}
      <TouchableOpacity
        onPress={() => setIsSignUp(!isSignUp)}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: colors.link, textAlign: "center" }}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});
