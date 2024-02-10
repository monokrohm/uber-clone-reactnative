import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../reduxHooks";
import { selectOrigin } from "../features/navSlice";

const data = [
  {
    id: "999",
    title: "Get a ride",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
    screen: "Map",
  },
  {
    id: "998",
    title: "Order food",
    image:
      "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,h_300,w_400/v1/experiments/projecticing/uk/cuisine-icons/Chinese.png",
    screen: "Eats",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useAppSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
          disabled={!origin}
        >
          <View className={`${!origin && "opacity-30"}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text className="mt-2 text-lg font-semibold">{item.title}</Text>

            <View className="mt-4 p-2 w-10 bg-black rounded-full">
              <ArrowRightIcon color={"white"} size={22} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
