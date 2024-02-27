export const metadata = {
	title: "All Categories",
	description: "All Categories",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
	},
};
export default function CategoriesLayout({ children }) {
	return <div>{children}</div>;
}
