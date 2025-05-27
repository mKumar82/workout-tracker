import React from "react";
import { render } from "@testing-library/react-native";
import WorkoutDetail from "../app/(main)/workout/[workout]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ workout: "1" }),
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("Workout Detail Screen", () => {
  it("renders the workout title and exercises", () => {
    const { getByText } = render(<WorkoutDetail />);
    expect(getByText("Full Body Blast")).toBeTruthy();
    expect(getByText("Pushups")).toBeTruthy();
  });
});
