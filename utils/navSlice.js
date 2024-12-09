import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	origin: null,
	destination: null,
	travelTimeInformation: null,
	rideType: null,
};

const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setOrigin: (state, action) => {
			state.origin = action.payload;
		},
		setDestination: (state, action) => {
			state.destination = action.payload;
		},
		setTravelTimeInformation: (state, action) => {
			state.travelTimeInformation = action.payload;
		},
		setRideType: (state, action) => {
			state.rideType = action.payload;
		},
	},
});

export const {
	setOrigin,
	setDestination,
	setTravelTimeInformation,
	setRideType,
} = navSlice.actions;

//selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
	state.nav.travelTimeInformation;
export const selectRideType = (state) => state.nav.rideType;

export default navSlice.reducer;
