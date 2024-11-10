'use client'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { forwardRef, useState, useEffect, useRef } from 'react'
import noImage from '@/public/assets/images/no-image.png'
import ProductViewSkeleton from '@/components/elements/loaders/ProductViewSkeleton'
import ProductZoomYetAnother from './ProductZoomYetAnother'
import { cn } from '@/utils'

const ProductViewSlider = forwardRef(
  ({ product, selectedColor, isSquareImage, isLoading }, ref) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const imageRefs = useRef([]) // Array of refs for each large image

    // Setting default image if no image is provided
    let slides = product?.photos?.length
      ? product?.photos
      : [{ image: noImage }]

    // Filtering slides based on selected color
    if (selectedColor) {
      const filteredSlides = slides.filter(
        slide => slide.color_name === selectedColor
      )
      if (filteredSlides.length) slides = filteredSlides
    }

    const handleOpenZoom = index => {
      setOpen(true)
      setIndex(index)
    }

    const handleThumbnailClick = idx => {
      setIndex(idx)
      // Scroll to the selected large image smoothly
      if (imageRefs.current[idx]) {
        imageRefs.current[idx].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 200)

      return () => clearTimeout(timer)
    }, [])

    return (
      <>
        {open && (
          <ProductZoomYetAnother
            open={open}
            setIndex={setIndex}
            index={index}
            setOpen={setOpen}
            images={slides}
          />
        )}
        {!loading ? (
          <div className='flex w-full'>
            {/* Left Side Thumbnail List (Fixed) */}
            <div className='sticky top-0 h-screen overflow-y-auto mr-4 no-scrollbar'>
              <div className='flex flex-col gap-4'>
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'w-18 h-28 border-2 cursor-pointer',
                      idx === index ? 'border-blue-500' : 'border-gray-300'
                    )}
                    onClick={() => handleThumbnailClick(idx)}
                  >
                    <Image
                      src={slide?.image || noImage}
                      alt={`Thumbnail ${idx}`}
                      width={64}
                      height={64}
                      className='object-cover h-full w-full'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Image Preview (Scrollable with hidden scrollbar) */}
            <div className='flex-1 h-screen px-4 overflow-y-auto no-scrollbar'>
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className='mb-8 cursor-pointer'
                  onClick={() => handleOpenZoom(idx)}
                  ref={el => (imageRefs.current[idx] = el)} // Assign ref to each image container
                >
                  <Image
                    src={slide?.image || noImage}
                    alt={`Image ${idx}`}
                    width={624}
                    height={624}
                    className='object-cover w-full'
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ProductViewSkeleton />
        )}
      </>
    )
  }
)

ProductViewSlider.displayName = 'ProductViewSlider'

export default ProductViewSlider
