import apiSlice from "./apiSlice";

const productsQnaAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToProductQna: builder.mutation({
      query: (payload) => ({
        url: "product-questions",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product-qna"],
    }),
    getProductQnaList: builder.query({
      query: (productId) => `products-questions/${productId}`,
      providesTags: ["product-qna"],
    }),
  }),
});

export const { useAddToProductQnaMutation, useGetProductQnaListQuery } =
  productsQnaAPI;
