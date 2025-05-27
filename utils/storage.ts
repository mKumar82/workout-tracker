// utils/storage.ts
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const saveCredentials = (email: string, password: string) => {
  storage.set("email", email);
  storage.set("password", password);
  storage.set("isLoggedIn", true);
};

export const getCredentials = () => {
  const email = storage.getString("email");
  const password = storage.getString("password");
  console.log("Retrieved email:", email);
  console.log("Retrieved password:", password);
  return { email, password };
};



export const clearCredentials = () => {
  storage.delete("email");
  storage.delete("password");
};






// Save user on sign-up
export const registerUser = (email: string, password: string) => {
  const usersJson = storage.getString("users");
  const users = usersJson ? JSON.parse(usersJson) : {};

  users[email] = password;
  storage.set("users", JSON.stringify(users));
};

// Validate user on login
export const validateUser = (email: string, password: string): boolean => {
  const usersJson = storage.getString("users");
  const users = usersJson ? JSON.parse(usersJson) : {};
  return users[email] === password;
};

// Save login session
export const loginUser = (email: string) => {
  storage.set("currentUser", email);
  storage.set("isLoggedIn", true);
};

// Clear login session
export const logoutUser = () => {
  storage.delete("currentUser");
  storage.set("isLoggedIn", false);
};

// Check if user is logged in
export const isLoggedIn = () => storage.getBoolean("isLoggedIn") || false;

// Log workout for current user
export const logWorkout = (workoutTitle: string) => {
  const currentUser = storage.getString("currentUser");
  if (!currentUser) return; // No user logged in

  const key = `history_${currentUser}`;
  const historyRaw = storage.getString(key);
  const history = historyRaw ? JSON.parse(historyRaw) : [];

  const timestamp = new Date().toISOString();
  const newEntry = { workoutTitle, timestamp };
  const updatedHistory = [...history, newEntry];

  storage.set(key, JSON.stringify(updatedHistory));
};

// Get workout history for current user
export const getWorkoutHistory = (): {
  workoutTitle: string;
  timestamp: string;
}[] => {
  const currentUser = storage.getString("currentUser");
  if (!currentUser) return [];

  const key = `history_${currentUser}`;
  const historyRaw = storage.getString(key);

  return historyRaw ? JSON.parse(historyRaw) : [];
};
