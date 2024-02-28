export const generateMetadata = async ({ params }, parent) => {
	const parentMetaData = await parent;
	return {
		title: `${params.category_slug} || ${parentMetaData.applicationName}`,
		description: `All ${params.category_slug} products of ${parentMetaData.applicationName}`,
		openGraph: {
			title: `${params.category_slug} || ${parentMetaData.applicationName}`,
			description: `All ${params.category_slug} products of ${parentMetaData.applicationName}`,
			url: `/categories/${params.category_slug}`,
		},
		alternates: {
			canonical: `/categories/${params.category_slug}`,
		},
	};
};

export default function CategoryLayout({ children }) {
	return <div>{children}</div>;
}
