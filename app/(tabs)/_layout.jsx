import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import SafeScreen from "../../components/SafeScreen";
import { Text } from "react-native";

const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // ***** ဒီနေရာကို ပြင်လိုက်ပါ *****
  if (!isLoaded) {
    // Clerk data loading မပြီးမချင်း Loading Screen ကို ပြသပါ
    // ဒါမှ Static build ရဲ့ initial load မှာ Blank မဖြစ်မှာပါ
    return (
      <SafeScreen style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={["top", "right", "left"]}>
        {/* Loading Spinner သို့မဟုတ် Text တစ်ခုခု ထည့်ပေးနိုင်ပါတယ် */}
        {/* React Native မှာဆိုရင် ActivityIndicator ကို သုံးနိုင်ပါတယ် */}
        <Text style={{ fontSize: 20 }}>Loading Application...</Text> 
      </SafeScreen>
    );
  }
  // ***** ပြင်ဆင်မှု ပြီးဆုံး *****

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;