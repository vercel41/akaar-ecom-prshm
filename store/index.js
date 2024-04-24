import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import apiSlice from "./api/apiSlice";
import authSlice from "./slices/authSlice";
import commonSlice from "./slices/commonSlice";

const store = configureStore({
	reducer: {
		cart: cartSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
		common: commonSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

// Add local storage persistence
store.subscribe(() => {
	const cartItems = store.getState().cart.cart;
	try {
		localStorage.setItem("cart_items", JSON.stringify(cartItems));
	} catch (error) {
		console.error("Error saving cart items to local storage:", error);
	}
});

export default store;
