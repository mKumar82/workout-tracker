import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { logWorkout } from "../../../utils/storage";

// Sample workout data
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

export default function WorkoutDetail() {
  const { workout } = useLocalSearchParams<{ workout: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  // text to speech function
  const announceExercise = (exercise: string) => {
    Speech.speak(`Next up: ${exercise}`);
    // Replace Speech.speak temporarily
    console.log("Speaking:", `Next up: ${exercise}`);
  };

  const data = workouts.find((w) => w.id === workout);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  // useEffect to handle timer countdown and exercise transitions
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timer === 0) {
      if (data && current < data.exercises.length - 1) {
        setCurrent(current + 1);

        setTimer(10);
      } else {
        completeWorkout();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // useEffect to announce the current exercise
  useEffect(() => {
    if (isRunning && data) {
      announceExercise(data.exercises[current]);
    }
  }, [current]);

  const startWorkout = () => setIsRunning(true);

  // Function to complete the workout
  const completeWorkout = () => {
    setIsRunning(false);
    logWorkout(data?.title || "Unknown Workout");
    alert("Workout complete!");
  };

  if (!data) {
    return <Text style={{ color: colors.text }}>Workout not found.</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        {current + 1} of {data.exercises.length}
      </Text>
      <Text style={[styles.exercise, { color: colors.text }]}>
        {data.exercises[current]}
      </Text>
      <Text style={[styles.timer, { color: colors.text }]}>{timer}s</Text>

      {!isRunning ? (
        <Button title="Start" onPress={startWorkout} />
      ) : (
        <Button title="Skip" onPress={() => setTimer(0)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  exercise: {
    fontSize: 32,
    marginBottom: 16,
  },
  timer: {
    fontSize: 48,
    marginBottom: 32,
  },
});
