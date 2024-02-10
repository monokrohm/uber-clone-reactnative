import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../reduxHooks";
import { selectTravelTimeInformation } from "../features/navSlice";

const data = [
  {
    id: "Uber-X-1",
    title: "UberX",
    multiplier: 1,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
  },
  {
    id: "Uber-XL-1",
    title: "UberXL",
    multiplier: 1.2,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png",
  },
  {
    id: "Uber-LUX-1",
    title: "UberLUX",
    multiplier: 1.75,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const travelTimeInfo = useAppSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState<any>(null);

  return (
    <SafeAreaView className=" flex-grow bg-white" edges={{ bottom: "maximum" }}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideDestination")}
          className="absolute p-3 top-3 left-5 rounded-full z-50"
        >
          <Ionicons name="chevron-back-outline" />
        </TouchableOpacity>
        <Text className="py-5 text-xl text-center">
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View className="-ml-6">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInfo?.duration?.text} Travel Time</Text>
            </View>
            <Text className="text-xl">
              {!travelTimeInfo
                ? "$0"
                : new Intl.NumberFormat("en-au", {
                    style: "currency",
                    currency: "AUD",
                  }).format(
                    (travelTimeInfo?.duration?.value *
                      SURGE_CHARGE_RATE *
                      multiplier) /
                      100
                  )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View className="mt-auto border-t border-gray-200">
        <TouchableOpacity
          disabled={!selected}
          className={`m-3 py-3 bg-black ${!selected && "bg-gray-300"}`}
        >
          <Text className="text-center text-xl text-white">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
