// "use client";

// import { fetchData } from "@/lib/fetch-data";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import ProductZoomYetAnother from "../products/[slug]/_components/ProductZoomYetAnother";
// import { useParams } from "next/navigation";
// import { useGetGalleryImagesQuery } from "@/store/api/gallaryAPI";


// const GallerySection = () => {
// //  const { data: settings = {} } = await fetchData({ api: "info/gallery" });

// const { locale } = useParams();
// 	const { data, isLoading } = useGetGalleryImagesQuery({ locale });
// 	const galleryImages = data?.data || [];

//   console.log("galleryImages",galleryImages)
//   console.log("data",data)


//   const [open, setOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   const handleOpenZoom = (index) => {
//     setOpen(true);
//     setIndex(index);
//   };

//   return (
//     <div>
//       <div className="container">
//         <h2 className="text-2xl mb-8 text-center">Purusham Grooms</h2>

//         {open && (
//           <ProductZoomYetAnother
//             open={open}
//             setIndex={setIndex}
//             index={index}
//             setOpen={setOpen}
//             images={galleryImages}
//           />
//         )}
//         <div>
//           <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
//             {galleryImages ? galleryImages.map((image, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleOpenZoom(index)}
//                 className="cursor-pointer"
//               >
//                 <Image
//                   src={image}
//                   alt="Gallery Image"
//                   width={600}
//                   height={600}
//                 />
//               </li>
//             ))
//             :
//             <p className="text-center font-bold text-2xl"></p>
//           }
//           </ul>
//         </div>

//         <div className="flex justify-center py-6">
//           <Link
//             href="#"
//             className="btn btn-secondary"
//             style={{
//               "--btn-bg-color": `#000000`,
//               "--btn-text-color": `#ffffff`,
//             }}
//           >
//             View More...
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GallerySection;


"use client";

import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductZoomYetAnother from "../products/[slug]/_components/ProductZoomYetAnother";
import { useParams } from "next/navigation";
import { useGetGalleryImagesQuery } from "@/store/api/gallaryAPI";

const GallerySection = () => {
  const { locale } = useParams();
  const { data, isLoading } = useGetGalleryImagesQuery({ locale });
  const galleryImages = data?.data || [];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpenZoom = (index) => {
    setOpen(true);
    setIndex(index);
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-2xl mb-8 text-center">ARZAALS Gallery</h2>

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
                  <div style={{width:'100%', height:'600px', position:'relative', overflow:'hidden'}}>
                    <Image
                      src={image}
                      alt="Gallery Image"
                      layout="fill"
                      objectFit="cover"
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
