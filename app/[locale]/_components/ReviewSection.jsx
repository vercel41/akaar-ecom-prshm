'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageDescriptionSection({ featuredProducts }) {
  const [activeButton, setActiveButton] = useState(0) // Default to the first product
  console.log(activeButton)

  const handleButtonClick = (index) => {
    setActiveButton(index)
  }

  return (
    <div className='md:container mx-auto md:p-4 w-full md:w-8/12'>
      <div className='md:flex hidden flex-col md:flex-row md:items-end gap-8'>
        <div className='w-full p-4'>
          <div className='relative w-full h-[400px] md:h-[600px] overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.img
                key={activeButton}
                src={featuredProducts[activeButton]?.image}
                alt={`Image for ${featuredProducts[activeButton]?.category_name}`}
                className='w-full h-auto'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Description */}
        <div className='md:block hidden text-start w-full p-4 mb-5'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeButton}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='flex flex-col'
            >
              <motion.p
                className='font-bold text-[22px]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
              >
                {featuredProducts[activeButton]?.category_name}
              </motion.p>
              <motion.p
                className='mt-5 text-[16px] tracking-normal font-[400] pb-14'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
              >
                Description will be here
                Description for {featuredProducts[activeButton]?.description} goes here.
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Image and Overlay */}
      <div className='md:hidden relative w-full h-[400px] md:h-[600px] overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.img
            key={activeButton}
            src={featuredProducts[activeButton]?.image}
            alt={`Image for ${featuredProducts[activeButton]?.category_name}`}
            className='w-full h-full object-cover'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeButton}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className='text-white'
            >
              <motion.h2
                className='text-lg md:text-2xl font-bold'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.03 }}
              >
                {featuredProducts[activeButton]?.category_name}
              </motion.h2>
              <motion.p
                className='mt-3 md:mt-5 text-sm tracking-normal'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.1 }}
              >
                Description for {featuredProducts[activeButton]?.category_name} goes here.
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex overflow-x-auto mt-4 space-x-4 scrollbar-hide md:justify-center'>
        {featuredProducts.map((product, index) => (
          <motion.button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`whitespace-nowrap ${
              activeButton === index
                ? 'font-semibold relative px-4 py-2 text-sm md:text-base focus:outline-none'
                : 'relative px-4 py-2 text-sm md:text-base focus:outline-none'
            }`}
            animate={{
              fontSize: activeButton === index ? '1rem' : '0.8rem',
              color: activeButton === index ? '#000' : '#000'
            }}
            transition={{ duration: 0.3 }}
          >
            {product.category_name}
            {activeButton === index && (
              <motion.div
                layoutId='underline'
                className='absolute bottom-0 left-0 h-[2px] bg-black'
                initial={false}
                animate={{
                  width: '100%',
                  opacity: 1,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
