export async function generateMetadata({ params }) {
  return {
    title: "Question and Answer",
  };
}

export default function HelpLayout({ children }) {
  return <div>{children}</div>;
}
