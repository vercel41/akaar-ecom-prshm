export async function generateMetadata({ params }) {
	return {
		title: "Question and Answer",
		description: "Question and Answer",
		openGraph: {
			title: "Question and Answer",
			description: "Question and Answer",
			url: `/help/qna`,
		},
		alternates: {
			canonical: `/help/qna`,
		},
	};
}

export default function HelpLayout({ children }) {
	return <div>{children}</div>;
}
