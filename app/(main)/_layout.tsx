import { useTheme } from "@/contexts/ThemeContext";
import { logoutUser, storage } from "@/utils/storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "react-native";

export default function AppLayout() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { colors } = useTheme(); // Use theme colors

  const handleLogout = () => {
    logoutUser();
    router.replace("/auth");
  };

  useEffect(() => {
    const savedEmail = storage.getString("currentUser") || "";
    setEmail(savedEmail);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: `Welcome, ${email.split("@")[0] || "User"}`,
          headerRight: () => (
            <Button title="Logout" onPress={handleLogout}  />
          ),
        }}
      />
      <Stack.Screen name="history" options={{ title: "History" }} />
      <Stack.Screen
        name="workout/[workout]"
        options={{ title: "Workout Details" }}
      />
    </Stack>
  );
}