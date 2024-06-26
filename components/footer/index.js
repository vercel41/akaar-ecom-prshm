import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import SubscriptionForm from "./SubscriptionForm";

// ** Import Icons
import SocialIcon from "../elements/SocialIcon";
import ScrollToTopButton from "../ScrollToTopButton";
import { FaFacebookMessenger } from "react-icons/fa";

const Footer = async () => {
	const translationData = await fetchData({ api: "translations" });
	const translations = translationData?.data || {};
	const { data: settings = {} } = await fetchData({ api: "info/basic" });

	const footerPage = settings?.footer_page || [];
	const helpPage = settings?.help_page || [];

	const messengerUser = settings?.facebook_link?.split("/")[3] || "no-user";

	return (
		<footer
			className="footer py-5"
			style={{
				backgroundColor: settings?.colors?.secondary,
				color: settings?.colors?.secondary_text,
			}}
		>
			<div className="container">
				<div className="text-center">
					<h2 className="text-3xl/[40px] font-title font-medium my-5">
						{translations["treat-your-inbox"] || "Treat your inbox"}
					</h2>
					<p className="mb-8 text-sm/6 font-light">
						{translations["receive-newsletter"] ||
							"Receive our newsletter on the latest deals and happenings. You can unsubscribe any time you want."}
					</p>
					<SubscriptionForm settings={settings} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-between gap-5 mt-8">
					<div className="text-sm/6 font-light">
						<h6 className="mb-4 font-title uppercase font-medium">
							{translations["customer-service"] || "CUSTOMER SERVICE"}
						</h6>
						<ul className="widget-list">
							<li>
								<Link
									className="hover:text-secondary"
									href={"/help/contact-us"}
								>
									{translations["contact"] || "Contact Us"}
								</Link>
							</li>
							<li>
								<Link className="hover:text-secondary" href={"/help/qna"}>
									{translations["questions-and-queries"] ||
										"Questions and Answer"}
								</Link>
							</li>
							{helpPage.map((page) => (
								<li key={page?.path}>
									<Link className="hover:text-secondary" href={page?.path}>
										{page?.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="text-sm/6 font-light">
						<h6 className="mb-4 font-title uppercase font-medium">
							{translations["company"] || "COMPANY"}
						</h6>
						<ul className="widget-list">
							{footerPage.map((page) => (
								<li key={page?.path}>
									<Link className="hover:text-secondary" href={page?.path}>
										{page?.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="">
						<div className="social-links text-center py-4 flex gap-3 items-center justify-center">
							<SocialIcon
								href={settings.facebook_link}
								icon={"/assets/icons/social/fb.svg"}
							/>
							<SocialIcon
								href={settings.youtube_link}
								icon={"/assets/icons/social/YouTube.svg"}
							/>
							<SocialIcon
								href={settings.whatsapp_link}
								icon={"/assets/icons/social/whatsapp.svg"}
								iconClass={"h-7 w-7"}
							/>
							<SocialIcon
								href={settings.tiktok_link}
								icon={"/assets/icons/social/TikTok.svg"}
							/>
							<SocialIcon
								href={settings.instagram_link}
								icon={"/assets/icons/social/instagram.svg"}
							/>
							<SocialIcon
								href={settings.pinterest_link}
								icon={"/assets/icons/social/pinterest.svg"}
							/>
						</div>
						<p className="mt-3 text-center text-sm/6 font-light">
							&copy; {new Date().getFullYear()}, All Rights Reserved By{" "}
							<Link href="/">{settings?.name}</Link>
						</p>
					</div>
				</div>
			</div>
			<ScrollToTopButton settings={settings} />
			<Link
					className="fixed z-30 bottom-20 right-6 text-blue-500"
					target="_blank"
					href={`https://m.me/${messengerUser}`}
				>
					<FaFacebookMessenger size={45} />
				</Link>
		</footer>
	);
};

export default Footer;
