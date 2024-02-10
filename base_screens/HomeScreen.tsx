import { View, Image } from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAppDispatch } from "../reduxHooks";
import { setDestination, setOrigin } from "../features/navSlice";
import NavFavourites from "../components/NavFavourites";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          source={require("../assets/uber_black.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );
          }}
          fetchDetails={true}
          query={{ key: process.env.GOOGLE_MAPS_API, language: "en" }}
          minLength={2}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
