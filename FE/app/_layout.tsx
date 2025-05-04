import { Stack } from "expo-router";
import './global.css'
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
      </Stack>
    </>
  )
}
