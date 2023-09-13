import apiSlice from "./apiSlice";

const filterOptionsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilterOptionsByCategory: builder.query({
      query: (payload) => ({
        url: `search-summery?${payload.searchQuery}`,
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["filter-options"],
    }),
  }),
});

export const { useGetFilterOptionsByCategoryQuery } = filterOptionsAPI;
