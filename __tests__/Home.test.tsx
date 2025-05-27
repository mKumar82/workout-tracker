import React from "react";
import { render } from "@testing-library/react-native";
import Home from "../app/(main)/index";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <NavigationContainer>{ui}</NavigationContainer>
    </ThemeProvider>
  );

describe("Home Screen", () => {
  it("renders the main button", () => {
    const { getByText } = renderWithProviders(<Home />);
    expect(getByText("Workout List")).toBeTruthy();
  });
});
