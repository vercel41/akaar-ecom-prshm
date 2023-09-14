import apiSlice from "./apiSlice";

const orderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeAnOrder: builder.mutation({
      query: (payload) => ({
        url: "checkout",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
    getOrders: builder.query({
      query: () => `order/index`,
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (payload) => ({
        url: `order/show/${payload?.order_id}`,
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  usePlaceAnOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = orderAPI;
