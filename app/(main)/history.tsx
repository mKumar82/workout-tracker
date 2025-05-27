import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getWorkoutHistory } from "../../utils/storage";
import { useTheme } from "@/contexts/ThemeContext";

export default function HistoryScreen() {
  const [history, setHistory] = useState<
    { workoutTitle: string; timestamp: string }[]
  >([]);
  const { colors } = useTheme();

  useEffect(() => {
    const data = getWorkoutHistory();
    setHistory(data.reverse()); // most recent first
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {history.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>
          No workouts logged yet.
        </Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.workout, { color: colors.text }]}>
                {item.workoutTitle}
              </Text>
              <Text style={[styles.date, { color: colors.text }]}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  workout: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
});