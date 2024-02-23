import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../features/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const mapRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom to fit
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
      });
    }, 500);
  }, [origin, destination]);

  useEffect(() => {
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin?.description}
        &destinations=${destination?.description}&key=${process.env.GOOGLE_MAPS_API}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(JSON.stringify(data));
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, process.env.GOOGLE_MAPS_API]);

  return (
    <MapView
      ref={mapRef}
      className="flex-1"
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={process.env.GOOGLE_MAPS_API!}
          strokeWidth={3}
          strokeColor="red"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier={"origin"}
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier={"destination"}
        />
      )}
    </MapView>
  );
};

export default Map;
