export const generateMetadata = async ({ params }) => ({
  title: `${params.category_slug}`,
  description: `${params.category_slug}`,
});

export default function CategoryLayout({ children }) {
  return <div>{children}</div>;
}
