import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGlobalLoading: false,
  isFilterPanelOpen: false,
  settings: null,
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
  },
});

export const { setGlobalLoader, toggleFilterPanel, setSettings } =
  commonSlice.actions;

export default commonSlice.reducer;
