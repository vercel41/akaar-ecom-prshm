import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isGlobalLoading: false,
	locale: "en",
	isFilterPanelOpen: true,
	settings: null,
	translations: {},
	activeCategory: null, //subcategories for navbar
	isFbPixelInitialized: false,
};

const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setGlobalLoader: (state, action) => {
			state.isGlobalLoading = action.payload;
		},
		toggleFilterPanel: (state) => {
			state.isFilterPanelOpen = !state.isFilterPanelOpen;
		},
		setSettings: (state, action) => {
			state.settings = action.payload;
		},
		setTranslations: (state, action) => {
			state.translations = action.payload;
		},
		setLocale: (state, action) => {
			state.locale = action.payload;
		},
		setFbPixelInitialized: (state, action) => {
			state.isFbPixelInitialized = action.payload;
		},
		setActiveCategory: (state, action) => {
			state.activeCategory = action.payload;
		},
	},
});

export const {
	setGlobalLoader,
	toggleFilterPanel,
	setSettings,
	setTranslations,
	setLocale,
	setActiveCategory,
	setFbPixelInitialized,
} = commonSlice.actions;

export default commonSlice.reducer;
