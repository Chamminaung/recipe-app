// fileName: _layout.jsx

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { Text } from "react-native";

// 1. Environment Variable ကနေ Key ကို ယူပါ
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  // 2. Key မရှိရင် Loading Application မှာပဲ ရပ်မနေစေဘဲ error ပြပါ
  if (!CLERK_PUBLISHABLE_KEY) {
    // Web build မှာဆိုရင် Text နဲ့ ပြန်ပေးရင် မြင်ရပါမယ်
    return (
      <SafeScreen style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={["top", "right", "left"]}>
        <Text style={{ fontSize: 18, color: 'red' }}>Error: Clerk Publishable Key is missing! Check your .env file.</Text>
      </SafeScreen>
    );
  }

  return (
    // 3. ClerkProvider မှာ Key ကို publishableKey prop အနေနဲ့ ပေးလိုက်ပါ
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SafeScreen style={{ flex: 1 }} edges={["top", "right", "left"]}>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}