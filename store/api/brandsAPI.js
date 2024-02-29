import apiSlice from "./apiSlice";

const brandsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (payload) => ({
        url: "brands",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["brands"],
    }),
  }),
});

export const { useGetBrandsQuery } = brandsAPI;
