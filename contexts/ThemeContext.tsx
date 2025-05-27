// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";
import { useEffect } from "react";
import { storage } from "@/utils/storage"; // Assuming MMKV setup here

const lightTheme = {
  background: "#fff",
  text: "#000",
  card: "#f0f0f0",

 
  subtle: "#666",
  inputBackground: "#fff",
  inputBorder: "#ccc",
  placeholder: "#999",
  link: "#007BFF",
};

const darkTheme = {
  background: "#121212",
  text: "#fff",
  card: "#1f1f1f",

  subtle: "#aaa",
  inputBackground: "#1e1e1e",
  inputBorder: "#555",
  placeholder: "#666",
  link: "#4aa3ff",
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  isDarkMode: boolean;
  colors: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  colors: lightTheme,
  toggleTheme: () => {},
});


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemPref = Appearance.getColorScheme() === "dark";

  const [isDarkMode, setIsDarkMode] = useState(systemPref);

  useEffect(() => {
    const savedTheme = storage.getBoolean("darkMode");
    if (savedTheme !== undefined) {
      setIsDarkMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      storage.set("darkMode", !prev);
      return !prev;
    });
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
