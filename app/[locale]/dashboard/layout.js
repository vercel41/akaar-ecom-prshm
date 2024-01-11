"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RequireAuth from "@/components/hoks/RequireAuth";

//icons
import { FaClipboardList, FaUser } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children, params }) => {
	const { settings } = useSelector((state) => state.common);
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
							<p className="my-1">Welcome to your account.</p>
						</div>
						<Link
							href={"/products"}
							className="border px-3 py-2 active:scale-95"
							style={{
								border: `1px solid ${settings?.colors?.primary}`,
								color: settings?.colors?.primary,
							}}
						>
							Go to shopping
						</Link>
					</div>
					<nav className="text-slate-500 border-y border-slate-200 mt-8 lg:mt-6">
						<ul className="w-full flex justify-evenly md:justify-around">
							{navItems.map((item) => (
								<li
									key={item.path}
									className={`py-1 px-2`}
									style={{
										backgroundColor:
											pathname === item.path ||
											pathname.split(locale)[1] === item.path
												? settings?.colors?.primary
												: "transparent",
										color:
											pathname === item.path ||
											pathname.split(locale)[1] === item.path
												? settings?.colors?.primary_text
												: "black",
									}}
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
