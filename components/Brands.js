"use client";
import Link from "next/link";
import Image from "next/image";

import { useGetBrandsQuery } from "@/store/features/api/brandsAPI";


const Brands = () => {
  const { data: brandsData } = useGetBrandsQuery();
  console.log('brandsData-------', brandsData);

  const brands = brandsData?.data || [];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {brands?.map((brand, i) => (
          <div class="mb-5">
            <Link
              href={`/brands/${brand.id}`}
              className=""
            >
              <Image
                src={brand.brand_image || noImage}
                alt={brand.title}
                width={112}
                height={112}
                className="w-[100%] h-[100%] object-cover shadow-lg"
              />
            </Link>
          </div>
        ))}

      </div>

    </>
  );
};

export default Brands;
