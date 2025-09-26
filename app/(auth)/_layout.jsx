import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Text } from 'react-native';
import SafeScreen from "../../components/SafeScreen";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  // ***** isLoaded ကို စစ်ဆေးပြီး Loading ပြန်ပေးပါ *****
  if (!isLoaded) {
    return (
      <SafeScreen style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={["top", "right", "left"]}>
        <Text style={{ fontSize: 20 }}>Checking Auth State...</Text>
      </SafeScreen>
    );
  }
  // ***** ပြင်ဆင်မှု ပြီးဆုံး *****

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{headerShown: false}}/>
}