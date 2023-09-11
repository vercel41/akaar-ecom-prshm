import Link from "next/link";
import { fetchData } from "@/utils/fetchData";

// ** Imoprt icons
import { BsFillTelephoneFill } from "react-icons/bs";
import ViewHTML from "@/components/elements/ViewHTML";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Sotota Stall || Booking Policy",
};

const DynamicPage = async ({ params }) => {
  const { page_slug } = params;

  const [pageRes] = await Promise.allSettled([
    fetchData({ api: `pages/${page_slug}` }),
  ]);

  const page = pageRes.status === "fulfilled" ? pageRes.value?.data || {} : {};
  if (!page.slug) return notFound();

  return (
    <>
      <div className="breadcrumb breadcrumb-2 py-5 border-b border-slate-200">
        <div className="container">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-primary"
            >
              হোম
            </Link>
            <Link
              href={`pages/${page.slug}`}
              className="text-base text-slate-900 hover:text-primary"
            >
              {page.title}
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-4">
          <ViewHTML htmlText={page.description} />
        </div>
        <div className="contact border-t border-slate-200 py-8 text-center flex justify-center">
          <div className="w-3/4 flex justify-center items-center gap-5 bg-amber-200 border border-primary rounded-xl p-4">
            <span className="text-xl font-bold font-title text-slate-900">
              যে কোন জিজ্ঞাসা বা অর্ডার করতে আমাদের কল করুন:
            </span>{" "}
            <Link
              href="tel:01720060958"
              className="text-xl font-bold font-title text-primary"
            >
              <BsFillTelephoneFill /> 01720060958
            </Link>{" "}
            <span className="text-sm text-slate-500">অথবা</span>{" "}
            <Link
              href="tel:01720060977"
              className="text-xl font-bold font-title text-primary"
            >
              <BsFillTelephoneFill /> 01720060977
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicPage;
