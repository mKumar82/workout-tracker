import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const scheme = useColorScheme();
  return {
    background: scheme === "dark" ? "#121212" : "#fff",
    text: scheme === "dark" ? "#fff" : "#000",
    primary: scheme === "dark" ? "#FFD700" : "#007AFF",
  };
};
