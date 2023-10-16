export async function generateMetadata({ params }) {
  return {
    title: "Contact Us",
  };
}

export default function HelpLayout({ children }) {
  return <div>{children}</div>;
}
