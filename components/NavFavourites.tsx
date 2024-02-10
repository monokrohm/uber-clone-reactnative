import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { BriefcaseIcon, HomeIcon } from "react-native-heroicons/solid";

const data = [
  {
    id: "123",
    icon: "HomeIcon",
    location: "Home",
    destination: "Glen Waverley, VIC, Australia",
  },
  {
    id: "456",
    icon: "BriefcaseIcon",
    location: "Work",
    destination: "Crown Melbourne, VIC, Australia",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[{ height: 0.5 }, { backgroundColor: "rgb(229 231 235)" }]}
        />
      )}
      renderItem={({ item: { icon, location, destination } }) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <View className="mr-4 p-3 rounded-full bg-gray-300">
            {icon == "HomeIcon" ? (
              <HomeIcon color={"white"} size={22} />
            ) : (
              <BriefcaseIcon color={"white"} size={22} />
            )}
          </View>
          <View>
            <Text className="text-lg font-semibold">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
