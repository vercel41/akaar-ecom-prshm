"use client";

import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductZoomYetAnother from "../products/[slug]/_components/ProductZoomYetAnother";

const GallerySection = () => {
  // const { data: settings = {} } = await fetchData({ api: "info/basic" });
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpenZoom = (index) => {
    setOpen(true);
    setIndex(index);
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-2xl mb-8 text-center">Purusham Grooms</h2>

        {open && (
          <ProductZoomYetAnother
            open={open}
            setIndex={setIndex}
            index={index}
            setOpen={setOpen}
            images={galleryImages}
          />
        )}
        <div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {galleryImages.map((image, index) => (
              <li
                key={index}
                onClick={() => handleOpenZoom(index)}
                className="cursor-pointer"
              >
                <Image
                  src={image.image}
                  alt="Gallery Image"
                  width={600}
                  height={600}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center py-6">
          <Link
            href="#"
            className="btn btn-secondary"
            style={{
              "--btn-bg-color": `#000000`,
              "--btn-text-color": `#ffffff`,
            }}
          >
            View More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;

const galleryImages = [
  { image: "https://purusham.com/cdn/shop/files/Artboard_4.png?v=1730206253" },
  { image: "https://purusham.com/cdn/shop/files/Artboard_1.png?v=1730206253" },
  { image: "https://purusham.com/cdn/shop/files/Artboard_3.png?v=1730206252" },
  { image: "https://purusham.com/cdn/shop/files/Artboard_2.png?v=1730206252" },
  {
    image:
      "https://purusham.com/cdn/shop/files/85052584_477553866463015_7267591767632162468_n.jpg?v=1614336329",
  },
  { image: "https://purusham.com/cdn/shop/files/2.png?v=1614344819" },
  { image: "https://purusham.com/cdn/shop/files/5.png?v=1614344820" },
  { image: "https://purusham.com/cdn/shop/files/9.png?v=1614344820" },
  { image: "https://purusham.com/cdn/shop/files/4.png?v=1614344820" },
  {
    image:
      "https://purusham.com/cdn/shop/files/77146616_148249949805490_7127907782964524533_n.jpg?v=1614336328",
  },
  { image: "https://purusham.com/cdn/shop/files/6.png?v=1614344823" },
  {
    image:
      "https://purusham.com/cdn/shop/files/Untitled_design.png?v=1614344820",
  },
];
