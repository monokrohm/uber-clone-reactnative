import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Info, Waypoint } from "../typings";
import { RootState } from "../store";

interface NavState{
    value: Waypoint
}

const initialState: NavState = {
    value: {
        origin: null,
        destination: null,
        travelTimeInformation: null,
    }
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action: PayloadAction<any>) =>{
            state.value.origin = action.payload;
        },
        setDestination: (state, action: PayloadAction<any>) =>{
            state.value.destination = action.payload;
        },
        setTravelTimeInformation: (state, action: PayloadAction<Info>) =>{
            state.value.travelTimeInformation = action.payload;
        }
    }
})

export const { setOrigin, setDestination, setTravelTimeInformation} = navSlice.actions;

export const selectOrigin = (state:RootState) => state.nav.value.origin;
export const selectDestination = (state:RootState) => state.nav.value.destination;
export const selectTravelTimeInformation = (state:RootState) => state.nav.value.travelTimeInformation;

export default navSlice.reducer;