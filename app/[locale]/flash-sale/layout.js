export const metadata = {
	title: "Flash selling products",
	description: "All flash selling products",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/flash-sale`,
	},
};
export default function FlashSellingProductsLayout({ children }) {
	return <div>{children}</div>;
}
