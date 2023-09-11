import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGlobalLoading: false,
  isFilterPanelOpen: false,
  settings: null,
  translations: null,
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
  },
});

export const {
  setGlobalLoader,
  toggleFilterPanel,
  setSettings,
  setTranslations,
} = commonSlice.actions;

export default commonSlice.reducer;
