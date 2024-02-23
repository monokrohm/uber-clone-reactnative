import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideDestinationCard from "../components/RideDestinationCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Bars3Icon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../reduxHooks";
import { setDestination, setOrigin } from "../features/navSlice";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          dispatch(setOrigin(null));
          dispatch(setDestination(null));
        }}
        className="absolute top-12 left-4 p-3 bg-gray-100 rounded-full z-50 shadow-lg android:border border-gray-300"
      >
        <Bars3Icon color={"black"} size={24} />
      </TouchableOpacity>

      <View className="h-1/2">
        <Map />
      </View>

      <View className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="RideDestination"
            component={RideDestinationCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptions"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
