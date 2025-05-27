import { ThemeProvider } from "@/contexts/ThemeContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export default function Layout() {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn, " isLoggedIn");
  // checks login status
  useEffect(() => {
    const checkLogin = () => {
      const status = storage.getBoolean("isLoggedIn") || false;
      setIsLoggedIn(status);
    };

    checkLogin();
    const interval = setInterval(checkLogin, 500); // 🔁 poll every 0.5s

    setIsReady(true);
    return () => clearInterval(interval);
  }, []);


  // redirects based on login status and current route
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/auth");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [segments, isLoggedIn, isReady]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SafeAreaView>
  );
}
