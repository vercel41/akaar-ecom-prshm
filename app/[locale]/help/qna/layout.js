export async function generateMetadata({ params }) {
	return {
		title: "Question and Answer",
		description: "Question and Answer",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/help/qna`,
		},
	};
}

export default function HelpLayout({ children }) {
	return <div>{children}</div>;
}
