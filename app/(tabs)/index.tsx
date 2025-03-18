import React from "react";
import { Stack } from "expo-router";
import HomeScreen from "../../src/screens/home/HomeScreen";

export default function HomePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, header: () => null }} />
      <HomeScreen />
    </>
  );
}
