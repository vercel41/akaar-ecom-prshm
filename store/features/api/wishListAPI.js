import apiSlice from "./apiSlice";

const wishListAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: (productInfo) => ({
        url: "wishlist/store",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishList: builder.query({
      query: (payload) => ({
        url: `wishlist/index`,
        headers: {
          lang: payload.locale || "en",
        },
      }),
      providesTags: ["wishlist"],
    }),
    removeFromWishList: builder.mutation({
      query: (productId) => ({
        url: `wishlist/destroy/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishListMutation,
  useGetWishListQuery,
  useRemoveFromWishListMutation,
} = wishListAPI;
