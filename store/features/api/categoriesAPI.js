import apiSlice from "./apiSlice";

const categoriesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: ["categories"],
    }),
    
    getPopularCategories: builder.query({
      query: () => `popular-categories?no_child=1`,
      providesTags: ["popular-categories"],
    }),
  }),
});

export const { useGetCategoriesQuery , useGetPopularCategoriesQuery} = categoriesAPI;
