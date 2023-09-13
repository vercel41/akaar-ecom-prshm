import apiSlice from "./apiSlice";

const visitedProductsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToVisited: builder.mutation({
      query: (payload) => ({
        url: "visit-history/store",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["visited"],
    }),
    getVisitedProducts: builder.query({
      query: (payload) => ({
        url: "visit-history/index",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["visited"],
    }),
  }),
});

export const { useAddToVisitedMutation, useGetVisitedProductsQuery } =
  visitedProductsAPI;
