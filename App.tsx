import { NativeWindStyleSheet } from "nativewind";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./base_screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./typings";
import MapScreen from "./base_screens/MapScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// FIX FOR WEB
NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <KeyboardAvoidingView /> ?? */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
