import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";

// ** Imoprt icons
import ViewHTML from "@/components/elements/ViewHTML";
import { notFound } from "next/navigation";
import Image from "next/image";

const DynamicPage = async ({ params }) => {
  const { blog_slug } = params;

  const [blogRes] = await Promise.allSettled([
    fetchData({ api: `pages/${blog_slug}?type=blog` }),
  ]);

  const blog = blogRes.status === "fulfilled" ? blogRes.value?.data || {} : {};
  if (!blog.slug) return notFound();

  return (
    <>
      <div className=" py-10">
        <div className="w-fit mx-auto">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              Home
            </Link>
            <span className="mx-2">|</span>
            <Link
              href={`/blogs`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              Blogs
            </Link>
            <span className="mx-2">|</span>
            <Link
              href={`${blog.slug}`}
              className="text-base  text-slate-900 hover:text-secondary"
            >
              <span className="max-w-[20ch] truncate ellipsis overflow-hidden">
                {blog.title}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className=" border-t border-gray-200">
        <div className="mb-4 container">
          <ViewHTML htmlText={blog.description} />
        </div>
      </div>
    </>
  );
};

export default DynamicPage;
