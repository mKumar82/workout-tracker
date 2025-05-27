import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const workouts = [
  {
    id: "1",
    title: "Full Body Blast",
    exercises: ["Pushups", "Squats", "Plank"],
  },
  {
    id: "2",
    title: "Cardio Burn",
    exercises: ["Jumping Jacks", "Burpees", "High Knees"],
  },
  {
    id: "3",
    title: "Core Strength",
    exercises: ["Crunches", "Leg Raises", "Russian Twists"],
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDarkMode, colors, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? "#fff" : "#000"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />

      <Text style={[styles.title, { color: colors.text }]}>Workout List</Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() =>
              router.push({
                pathname: "/workout/[workout]",
                params: { workout: item.id },
              })
            }
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.cardSubtitle, { color: colors.text }]}>
              {item.exercises.length} exercises
            </Text>
          </Pressable>
        )}
      />

      <Button title="View History" onPress={() => router.push("/history")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
