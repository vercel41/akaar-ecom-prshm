import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Page = async () => {
  const [blogRes] = await Promise.allSettled([
    fetchData({ api: `pages?type=blog` }),
  ]);
  const blogs = blogRes.status === "fulfilled" ? blogRes.value?.data || [] : [];
  return (
    <div className="container min-h-screen">
      <div className=" pt-6">
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
          </div>
        </div>
      </div>
      <div className="px-6 py-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-around ">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group block h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-300 min-h-[450px]"
          >
            <div className="flex flex-col h-full">
              <div className="w-full h-[200px] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={400}
                />
              </div>
              <div className="px-6 py-10 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-3 mb-4">
                  {blog.title}
                </h2>
                <div className="mt-auto">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-auto">Read more</span>
                    <BsArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 group-hover:text-rose-600" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
