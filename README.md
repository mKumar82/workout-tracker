
# 🏋️ Three-Screen Workout Tracker

A simple React Native app to help you stay fit and organized. Built with Expo, this app includes:

- 💡 Light/Dark Mode toggle (persisted)
- 🔊 Voice cues during workouts
- 🔐 Local authentication (Sign In / Sign Up)
- 📊 Workout logging via MMKV (fast local storage)

---

## 📱 Screens

- **Auth Screen** – Sign In / Sign Up
- **Home Screen** – Start workouts and toggle theme
- **Workout Detail** – Timed exercises with voice prompts
- **History Screen** – View past workouts on a calendar

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/workout-tracker.git
cd workout-tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Expo server

```bash
npx expo start
or 
npx expo run:android
npx expo run:ios
```

---

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [MMKV Storage](https://github.com/mrousavy/react-native-mmkv)
- [Expo Speech](https://docs.expo.dev/versions/latest/sdk/speech/)
- [Expo Router](https://expo.github.io/router/docs)

---

## 📁 Folder Structure

```
.
├── app/
│   ├── index.tsx         # Home Screen
│   ├── auth.tsx          # Auth Screen
│   ├── workout/          # Workout details screen
│   └── history.tsx       # Workout calendar
├── contexts/
│   └── ThemeContext.tsx  # Theme management
├── utils/
│   └── storage.ts        # MMKV storage functions
```

---

## ✨ Features to Add

- ✅ Voice cues (TTS)
- ✅ Workout history
- ✅ Dark mode

---

## 🙌 Contributing

PRs are welcome! If you find bugs or want to request features, please open an issue.

---

## 📄 License

MIT License. Use it freely and stay fit! 💪
