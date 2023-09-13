import apiSlice from "./apiSlice";

const categoriesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (payload) => ({
        url: "categories",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesAPI;
