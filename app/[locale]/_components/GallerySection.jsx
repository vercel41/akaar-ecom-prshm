"use client";

import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductZoomYetAnother from "../products/[slug]/_components/ProductZoomYetAnother";
import { useParams } from "next/navigation";
import { useGetGalleryImagesQuery } from "@/store/api/gallaryAPI";
import { useSelector } from "react-redux";

const GallerySection = () => {
  const { locale } = useParams();
  const { data, isLoading } = useGetGalleryImagesQuery({ locale });
  const galleryImages = data?.data || [];
  const { settings } = useSelector((state) => state.common);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpenZoom = (index) => {
    setOpen(true);
    setIndex(index);
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-2xl mb-8 text-center uppercase">{settings?.name} Gallery</h2>

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
            {galleryImages ? (
              galleryImages.map((image, index) => (
                <li
                  key={index}
                  onClick={() => handleOpenZoom(index)}
                  className="cursor-pointer"
                >
                  <div className="w-full h-[250px] md:h-[400px] relative overflow-hidden">
                    <Image
                      src={image}
                      alt="Gallery Image"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center font-bold text-2xl"></p>
            )}
          </ul>
        </div>

        <div className="flex justify-center py-6">
          <Link
            href="/products"
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
