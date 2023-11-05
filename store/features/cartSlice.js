import { generateUniqueId } from "@/utils/getUniqueId";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Helper function to load cart items from local storage
const loadCartItemsFromLocalStorage = () => {
	if (typeof window !== "undefined") {
		try {
			const cartItems = localStorage.getItem("cartItems");
			if (cartItems) {
				return JSON.parse(cartItems);
			}
		} catch (error) {
			console.error("Error loading cart items from local storage:", error);
		}
	}
	return null; // Return null if no cart items found or error occurred
};

const initialState = {
	isCartOpen: false,
	selectedProduct: null,
	cart: loadCartItemsFromLocalStorage() || [], // Initialize with local storage data or an empty array
	discountCoupon: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		addToSelected: (state, action) => {
			state.selectedProduct = action.payload;
		},
		removeFromSelected: (state) => {
			state.selectedProduct = null;
		},

		//Adding new item to the cart
		addToCart: (state, action) => {
			const product = { ...action.payload };

			const findProductWithVariant = (cart, product) => {
				return cart.find(
					(item) =>
						item.id === product.id && item.variantId === product.variantId
				);
			};

			if (product.variantId) {
				// Variant Item
				const variantProduct = findProductWithVariant(state.cart, product);
				if (variantProduct) {
					//checking available stock
					if (
						variantProduct.quantity >= product?.selectedVariant?.stock_quantity
					) {
						toast.error("No more stock for this variant");
						return;
					}
					const cartId = variantProduct.cartId;
					const index = state.cart.map((item) => item.cartId).indexOf(cartId);

					//Updating item
					const item = state.cart[index];
					item.quantity++;
					state.cart.splice(index, 1, item);
				} else {
					product.cartId = generateUniqueId();
					product.quantity = 1;
					state.cart.push(product);
				}
			} else {
				// Non Variant Item
				const index = state.cart.map((item) => item.id).indexOf(product.id);
				if (index === -1) {
					product.cartId = generateUniqueId();
					product.quantity = 1;
					state.cart.push(product);
				} else {
					//Incrementing quantity for existing items
					const existingProduct = state.cart[index];

					//checking available stock
					if (existingProduct.quantity >= product?.stock_qty) {
						toast.error("No more products");
						return;
					}

					existingProduct.quantity++;
					state.cart.splice(index, 1, existingProduct);
				}
			}
			toast.success("Added to cart");
		},

		// Increasing Item Quantity
		addQuantity: (state, action) => {
			const cartId = action.payload;
			const index = state.cart.map((item) => item.cartId).indexOf(cartId);

			//Updating item
			const item = state.cart[index];

			//checking available stock for regular products
			if (item.quantity >= item.stock_qty) {
				toast.error("No more products");
				return;
			}

			//checking available stock for variant products
			if (
				item.variantId &&
				item.quantity >= item?.selectedVariant?.stock_quantity
			) {
				toast.error("No more stock for this variant");
				return;
			}

			item.quantity++;
			state.cart.splice(index, 1, item);
		},

		// Decreasing Item Quantity
		removeQuantity: (state, action) => {
			const cartId = action.payload;
			const index = state.cart.map((item) => item.cartId).indexOf(cartId);

			//Updating item
			const item = state.cart[index];
			if (item.quantity > 1) {
				item.quantity--;
				state.cart.splice(index, 1, item);
			} else {
				state.cart.splice(index, 1);
			}
		},

		//Removing item from cart
		removeFromCart: (state, action) => {
			const cartId = action.payload;
			const index = state.cart.map((item) => item.cartId).indexOf(cartId);
			state.cart.splice(index, 1);
		},

		// Clear all items from cart
		clearCart: (state) => {
			state.cart = [];
		},

		// Add coupon discount
		addDiscountInfo: (state, action) => {
			const discount = action.payload;
			state.discountCoupon = discount;
		},

		// Clear coupon discount
		clearDiscountInfo: (state, action) => {
			const discount = action.payload;
			state.discountCoupon = discount;
		},
	},
});

export const {
	toggleCart,
	addToSelected,
	removeFromSelected,
	addToCart,
	addQuantity,
	removeQuantity,
	removeFromCart,
	clearCart,
	addDiscountInfo,
	clearDiscountInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
