"use client";

import { logoutUser } from "@/store/features/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import RequireAuth from "@/components/hoks/RequireAuth";

//icons
import { FaClipboardList, FaUser } from "react-icons/fa";
import { HiHeart, HiReceiptPercent, HiTicket } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";

const DashboardLayout = ({ children, params }) => {
  const { locale } = params;
  const dispatch = useDispatch();
  const pathname = usePathname();
  const navItems = [
    { text: "আমার প্রফাইল", icon: <FaUser />, path: "/dashboard" },
    {
      text: "আমার অর্ডার",
      icon: <FaClipboardList />,
      path: "/dashboard/my-orders",
    },
    {
      text: "আমার উইশ লিষ্ট",
      icon: <HiHeart />,
      path: "/dashboard/my-wishlist",
    },
    {
      text: "আমার রিভিউ",
      icon: <MdRateReview />,
      path: "/dashboard/my-reviews",
    },
    {
      text: "ভাউচার",
      icon: <HiReceiptPercent />,
      path: "/dashboard/my-voucher",
    },
    {
      text: "প্রশ্ন ও উত্তর",
      icon: <RiQuestionAnswerFill />,
      path: "/dashboard/qna",
    },
    {
      text: "সাপোর্ট টিকিট",
      icon: <HiTicket />,
      path: "/dashboard/support-ticket",
    },
  ];

  return (
    <div className="bg-slate-100">
      <div className="container">
        <div className="bg-white grid grid-cols-[max-content_1fr] min-h-screen">
          <div className="border-r border-slate-300 px-6 py-12">
            <nav className="text-slate-500">
              <ul className="w-[15.25rem]">
                {navItems.map((item) => (
                  <li
                    key={item.path}
                    className={`flex items-center py-3 px-4 rounded-lg w-full font-bold ${
                      pathname === item.path ||
                      pathname.split(locale)[1] === item.path
                        ? "bg-amber-200 border-b-2 border-primary text-primary"
                        : ""
                    }`}
                  >
                    <Link
                      href={item.path}
                      className="flex items-center space-x-2"
                    >
                      <span
                        className={`${
                          pathname === item.path ? "" : "text-amber-400"
                        } font-bold text-xl`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </Link>
                  </li>
                ))}
                <li
                  className={`flex items-center py-3 px-4 rounded-lg w-full font-bold`}
                >
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => dispatch(logoutUser())}
                  >
                    <span className={`text-amber-400 font-bold text-xl`}>
                      <IoLogOut />
                    </span>
                    <span>লগ-আউট</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RequireAuth(DashboardLayout);
