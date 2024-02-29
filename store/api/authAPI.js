import apiSlice from "./apiSlice";

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => `countries`,
      providesTags: ["countries"],
    }),
    otpLogin: builder.mutation({
      query: (loginData) => ({
        url: "login-phone",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "verify-otp",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: () => `user`,
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "update-profile",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useOtpLoginMutation,
  useVerifyOtpMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
} = authAPI;
