export async function generateMetadata({ params }) {
	return {
		title: "Contact Us",
		description: "Contact Us",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/help/contact-us`,
		},
	};
}

export default function HelpLayout({ children }) {
	return <div>{children}</div>;
}
