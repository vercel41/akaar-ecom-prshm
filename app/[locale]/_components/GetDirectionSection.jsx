import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";

const GetDirectionSection = async () => {
  const { data: settings = {} } = await fetchData({ api: "info/basic" });
  const { data: outLetData = {} } = await fetchData({
    api: "info/outlet-info",
  });

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${outLetData?.outlet_background_image})`,
          backgroundSize: "cover", // Optional: Ensures the image covers the container
          backgroundPosition: "center", // Optional: Centers the image
        }}
        className={` w-full bg-cover bg-center bg-no-repeat bg-fixed mb-20`}
      >
        <div className="md:px-14 md:py-28 py-20">
          <div className="md:max-w-[430px] w-full bg-white px-5 py-10 text-center flex flex-col items-center justify-center">
            <h3 className="text-[17px] text-[#1c1b1b] font-bold mb-6">
              OUR FLAGSHIP STORE
            </h3>
            <div className="flex flex-col gap-2 tracking-normal mb-8">
              <p>{outLetData?.outlet_address}</p>

              <div className="flex flex-col gap-2 mt-6">
                <p className="italic">{outLetData?.closed_on}</p>
                <p>{outLetData?.timing}</p>
              </div>
            </div>

            <Link
              href="/help/contact-us"
              className="btn btn-secondary"
              style={{
                "--btn-bg-color": `${settings?.colors?.primary}`,
                "--btn-text-color": `${settings?.colors?.primary_text}`,
              }}
            >
              Get Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDirectionSection;
