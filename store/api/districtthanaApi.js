import apiSlice from "./apiSlice";

const districtthanaAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    district: builder.query({
      query: () => `districts`,
    }),
    thanaById: builder.query({
      query: (id) => `thanas?district_id=${id}`,
    }),
  }),

});

export const { useDistrictQuery, useThanaByIdQuery } = districtthanaAPI;
