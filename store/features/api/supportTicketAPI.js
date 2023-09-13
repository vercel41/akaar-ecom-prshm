import apiSlice from "./apiSlice";

const supportTicketAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSupportTicket: builder.mutation({
      query: (ticketInfo) => ({
        url: "support-ticket/store",
        method: "POST",
        body: ticketInfo,
      }),
      invalidatesTags: ["s-ticket"],
    }),
    getSupportTicket: builder.query({
      query: (payload) => ({
        url: "support-ticket/index",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["s-ticket"],
    }),
    getSupportTicketTypes: builder.query({
      query: (payload) => ({
        url: "support-ticket-type",
        headers: {
          lang: payload?.locale,
        },
      }),
      providesTags: ["s-ticket-type"],
    }),
  }),
});

export const {
  useAddSupportTicketMutation,
  useGetSupportTicketQuery,
  useGetSupportTicketTypesQuery,
} = supportTicketAPI;
