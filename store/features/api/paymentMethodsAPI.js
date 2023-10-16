import apiSlice from "./apiSlice";

const paymentMethodsAPI = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPaymentMethods: builder.query({
			query: () => ({
				url: "info/payment-method",
			}),
			providesTags: ["payment-methods"],
		}),
	}),
});

export const { useGetPaymentMethodsQuery } = paymentMethodsAPI;
