"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RequireAuth from "@/components/hoks/RequireAuth";

//icons
import { FaClipboardList, FaUser } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";

const DashboardLayout = ({ children, params }) => {
  const { locale } = params;
  const pathname = usePathname();
  const navItems = [
    { text: "My Details", icon: <FaUser />, path: "/dashboard" },
    {
      text: "Order History",
      icon: <FaClipboardList />,
      path: "/dashboard/my-orders",
    },
    {
      text: "My Wishlist",
      icon: <HiHeart />,
      path: "/dashboard/my-wishlist",
    },
  ];

  return (
    <div className="bg-slate-100">
      <div className="container">
        {/* <h3 className="text-center text-5xl my-28">Welcome to Dashboard</h3> */}
        <div className="bg-white border-b border-slate-200">
          <h3 className="text-center text-2xl lg:text-3xl pt-8">My Account</h3>
          <div className="flex flex-col items-center text-center lg:text-start gap-4 md:flex-row md:justify-between mt-4 px-4">
            <div className="text-sm text-slate-600">
              <p className="my-1">Hello Customer</p>
              <p className="my-1">Welcome to your Style Mart Brand account.</p>
            </div>
            <Link
              href={"/products"}
              className="border px-3 border-primary py-2 hover:text-secondary hover:border-secondary active:scale-95"
            >
              Go to shopping
            </Link>
          </div>
          <nav className="text-slate-500 border-y border-slate-200 mt-8 lg:mt-6">
            <ul className="w-full flex justify-evenly md:justify-around">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className={`py-1 px-2 ${
                    pathname === item.path ||
                    pathname.split(locale)[1] === item.path
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  <Link href={item.path}>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:min-h-[70vh]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RequireAuth(DashboardLayout);
