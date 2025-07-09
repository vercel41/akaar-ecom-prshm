import SocialIcon from "@/components/elements/SocialIcon";
import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default async function FeaturesSection() {
  const { data: settings = {} } = await fetchData({ api: "info/basic" });
  const amsPublickey = process.env.AMS_PUBLIC_KEY;
  const isShowSection =
    amsPublickey == "pub_WJE1qBqvbhzWgzSN2buu7fm6ESNRwX82i2q" ? true : false;
  return (
    <>
      {isShowSection && (
        <div className="w-full py-12">
          <div className="container mx-auto ">
            {/* Features Grid */}
            <div className="flex flex-col md:flex-row lg:flex-row gap-8 justify-between">
              {/* Free Delivery */}
              {settings?.free_delivery_charges_limit ? (
                <div className="flex justify-around items-center bg-[#FAFAFA] p-10">
                  <div className="w-1/2">
                    <Image
                      src="/assets/icons/delivery-icon.svg"
                      alt="Delivery Icon"
                      width={70}
                      height={70}
                      className="mt-10"
                    />
                  </div>
                  <div className="w-1/2">
                    <h3 className="text-[#429131] font-bold text-2xl mb-2">
                      FREE DELIVERY
                    </h3>
                    <p className="text-gray-600">
                      Free delivery over {settings?.free_delivery_charges_limit}{" "}
                      BDT shopping.
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* Easy Policies */}
              <div className="flex flex-col justify-between text-left ml-20">
                <div className="text-gray-600 mb-4">
                  <Image
                    src="/assets/icons/returns.svg"
                    alt="Delivery Icon"
                    width={70}
                    height={70}
                    className=""
                  />
                </div>
                <h3 className="text-green-600 font-bold text-xl mb-2">
                  EASY Policies
                </h3>
                <p className="text-gray-600">Delivery/Return in easy way</p>
              </div>

              {/* Secure Payment */}
              <div className="flex justify-around items-center bg-[#FAFAFA] p-10">
                <div className="w-1/2">
                  <Image
                    src="/assets/icons/gift_card.svg"
                    alt="Delivery Icon"
                    width={70}
                    height={70}
                    className="mt-10"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="text-[#429131] font-bold text-2xl mb-2">
                    Secure Payment
                  </h3>
                  <p className="text-gray-600">COD/bKash/Cards</p>
                </div>
              </div>

              {/* Over Thousands Styles */}
              <div className="flex flex-col justify-between text-left ml-20">
                <div className="text-gray-600 mb-4">
                  <Image
                    src="/assets/icons/tshirt.svg"
                    alt="Delivery Icon"
                    width={70}
                    height={70}
                    className=""
                  />
                </div>
                <h3 className="text-green-600 font-bold text-xl mb-2">
                  Over Thousands Styles
                </h3>
                <p className="text-gray-600">Everything you need</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
              <h3 className="text-green-600 font-bold">FOLLOW US</h3>
              <div className="h-1 w-8 bg-black hidden md:block"></div>
              <div className="flex space-x-4">
                {settings.facebook_link && settings.facebook_link !== "#" && (
                  <SocialIcon
                    href={settings.facebook_link}
                    icon={<FaFacebookF size={18} />}
                    linkClass={
                      "bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                    }
                  />
                )}

                {settings.instagram_link && settings.instagram_link !== "#" && (
                  <SocialIcon
                    href={settings.instagram_link}
                    icon={<FaInstagram size={18} />}
                    linkClass={
                      "bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                    }
                  />
                )}

                {settings.twitter_link && settings.twitter_link !== "#" && (
                  <SocialIcon
                    href={settings.twitter_link}
                    icon={<FaXTwitter size={18} />}
                    linkClass={
                      "bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                    }
                  />
                )}

                {settings.youtube_link && settings.youtube_link !== "#" && (
                  <SocialIcon
                    href={settings.youtube_link}
                    icon={<FaYoutube size={18} />}
                    linkClass={
                      "bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
