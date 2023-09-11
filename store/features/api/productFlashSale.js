import apiSlice from "./apiSlice";

const productFlashSale = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductFlashSale: builder.query({
      query: (payload) => `product-flash-sale?${payload}`,
      providesTags: ["product-flash-sale"],
    }),
  }),
});

export const { useGetProductFlashSaleQuery } = productFlashSale;
