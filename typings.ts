export type Waypoint = {
    origin: Point | null;
    destination: Point | null;
    travelTimeInformation: Info | null;
}

export type Point = {
    location: {
        lat: number;
        lng: number;
    }
    description: string;
}

export type Info = {
    distance: {
        text: string;
        value: number;
    }
    duration:{
        text: string;
        value: number;
    }
}

export type RootStackParamList = {
    Home: undefined;
    Map: undefined;
    Eats: undefined;
    RideDestination: undefined;
    RideOptions: undefined;
};

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}