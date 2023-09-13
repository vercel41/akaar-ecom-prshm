import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  isLoginModalOpen: false,
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (user, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`user`);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoginModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUserLoading, setUser, setLoginModalOpen } = authSlice.actions;

export default authSlice.reducer;
