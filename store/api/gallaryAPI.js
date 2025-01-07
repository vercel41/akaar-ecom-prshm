import apiSlice from "./apiSlice";

const getGalleryImagesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryImages: builder.query({
      query: (payload) => ({
        url: "info/gallery",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["gallery"],
    }),
  }),
});

export const { useGetGalleryImagesQuery } = getGalleryImagesAPI;