import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAppDispatch } from "../reduxHooks";
import { setDestination } from "../features/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import Ionicons from "@expo/vector-icons/Ionicons";

const RideDestinationCard = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="py-5 text-xl text-center">Good Morning.</Text>

      <View className="flex-shrink border-t border-gray-200">
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={inputBoxStyles}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptions");
            }}
            fetchDetails={true}
            query={{ key: process.env.GOOGLE_MAPS_API, language: "en" }}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>

        <NavFavourites />
      </View>

      <View className="flex-row justify-evenly mt-auto py-2 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptions")}
          className="flex-row items-center justify-between px-4 py-3 w-24 rounded-full bg-black"
        >
          <Ionicons name="car" size={18} color="white" />
          <Text className="text-center text-white">Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 w-24 rounded-full">
          <Ionicons name="fast-food-outline" size={18} color="black" />
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideDestinationCard;

const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
