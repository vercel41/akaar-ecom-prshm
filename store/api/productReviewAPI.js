import apiSlice from "./apiSlice";

const productReviewAPI = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Creating new ordered products review
		addReview: builder.mutation({
			query: (payload) => ({
				url: "product-review",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["user-reviews", "product-reviews"],
		}),

		// Dashboard Orders reviews
		getUserReviews: builder.query({
			query: () => `sell-product-review`,
			providesTags: ["user-reviews"],
		}),

		// Dashboard order review show
		getUserReviewShow: builder.query({
			query: (orderId) => `sell-product-review/${orderId}`,
			providesTags: ["user-review-show"],
		}),

		//Get Product all reviews
		getProductReviews: builder.query({
			query: (productId) => `product-review?product_id=${productId}`,
			providesTags: ["product-reviews"],
		}),

		//Product Review Summary
		getReviewSummary: builder.query({
			query: (productId) => `review-summary/${productId}`,
			providesTags: ["review-summary"],
		}),

		//Product all review images
		getReviewImages: builder.query({
			query: (productId) => `review-images/${productId}`,
			providesTags: ["review-images"],
		}),

		//Product review show
		getReviewDetails: builder.query({
			query: (payload) => `review-details/${payload}`,
			providesTags: ["review-details"],
		}),

		//Product review like/dislike
		addReviewReact: builder.mutation({
			query: (payload) => ({
				url: "product-comment/react",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["product-reviews", "review-details"],
		}),
	}),
});

export const {
	useAddReviewMutation,
	useGetProductReviewsQuery,
	useGetUserReviewsQuery,
	useGetUserReviewShowQuery,
	useGetReviewSummaryQuery,
	useGetReviewImagesQuery,
	useAddReviewReactMutation,
	useGetReviewDetailsQuery,
} = productReviewAPI;
