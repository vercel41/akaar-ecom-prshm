import apiSlice from "./apiSlice";

const productFlashSaleAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductFlashSale: builder.query({
      query: (payload) => ({
        url: `product-flash-sale?${payload?.searchQuery}`,
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["product-flash-sale"],
    }),
  }),
});

export const { useGetProductFlashSaleQuery } = productFlashSaleAPI;
