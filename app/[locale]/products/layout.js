export const metadata = {
	title: "All Products",
	description: "ALL Products",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
	},
};
export default function FlashSaleLayout({ children }) {
	return <div>{children}</div>;
}
