'use client'

import { useState } from 'react'

const contentData = {
  A: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/Purusham_06-09-221327-1_1000x.jpg?v=1698906747',
    title: 'Aglow',
    description:
      "Tailor-made for the gentleman that you are, Aglow by Purusham is everything you'd need on your wedding day. With class-apart artistry, stunning colors and finest designs, Aglow takes up a very special place in your wedding saga. It's finesse wraps you up in unparalleled luxury and comfort. This sartorial brilliance is made to mesmerize, it is made to stay as a part of your most beautiful memories.Intricately detailed thread work with a perfectly balanced color palette- get ready to be a dapper in the upcoming saga of weddings. Deck up in complete bespoke extravagance, indomitably resplendent, and magnificently charming, deck up in perfection."
  },
  B: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/second_1_1000x.jpg?v=1698906746',
    title: 'Scintilla',
    description:
      "Scintillating with grace, this collection finds you shining in your most precious form. Be an epitome of opulence,of significance and of perfection as you let this collection embrace your style. A true testament to impeccable designs and unique artistry, Scintilla by Purusham shimmers glamour to make you stand out of the ordinary. Made with love and precision, it's sure to make you steal the day with your statement style and unwavering elegance. As you adorn the beautiful work of Scintilla, you'll know it's way beyond an ordinary couture, it's an ode to the work of art."
  },
  C: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/slide-9_1000x.png?v=1637749547',
    title: 'Regal Radiance',
    description:
      'Since time immemorial, the sun has been revered for being the powerful and fiery force that it is. And while its golden shimmer inspired poetry and literature, its powerful nature inspired rulers. It showed them how power is not about the glory that comes with it. It is about burning with such passion that you light up the whole world.Purusham’s Regal Radiance collection celebrates the mighty spirit of the sun and the Modern Maharajas who resemble this spirit. Through its ethereal and enchanting designs, the collection bestows upon the wearer the sun’s eternal glow and charm.'
  },
  D: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/slide-8_1000x.png?v=1637749617',
    title: 'Regal Crest',
    description:
      'Some nights, when the rest of the world had descended into a deep sleep, he stayed up, gazing at the sky. The moon and the stars that had now taken over the sky left him enthralled. For him, they seemed like a window into the vastness of the cosmos- a realm of infinite possibilities and eternal beauty. A realm, where he someday hoped to reach.Years later, on his grand night, a special someone arrived to meet him. And as it entered, he couldn’t believe his eyes. It was his beloved Cosmos! But it had arrived in a rather unusual form - an enchanting Regal Crest outfit. Something that he would forever hold dear to his heart.'
  },
  E: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/slide-11_1000x.png?v=1637749694',
    title: 'Miraan',
    description:
      'With a charismatic persona and a penchant for style, he was the quintessential handsome man. Donned in a ravishing attire, he was all set to own the opulent celebration with his elegance and modern masculinity. And when his girl lay her eyes on him, she instantly knew that he was everything she had been waiting for. Her prince charming had arrived!Miraan is a spell that turns a man into a dashing prince. And turns ordinary lives into fairy tales with its dreamy collection.'
  },
  F: {
    imageSrc:
      'https://purusham.com/cdn/shop/files/slide-10_1000x.png?v=1637749717',
    title: 'Hampi',
    description:
      'In Hampi, a heavenly place in southern India, a slice of the country’s rich past lives through its magnificent ruins. It was once the capital of the mighty and rich Vijayanagar empire, the greatest Hindu empire in the medieval period. Even today, the splendour of this great regime can be felt through its arresting architecture.Purusham’s Hampi collection is inspired by this fantastical city. Like Hampi, it too brings the past to life by reviving traditional Indian craftsmanship and ancient weaving techniques. And excites your imagination, just the way the city does!'
  }
}

export default function ImageDescriptionSection () {
  const [activeButton, setActiveButton] = useState('A')

  const handleButtonClick = buttonKey => {
    setActiveButton(buttonKey)
  }

  return (
    <div className='container mx-auto p-4 w-8/12'>
      {/* Main content section */}
      <div className='flex flex-col md:flex-row items-end gap-8'>
        {/* Left section (Image) */}
        <div className='w-full p-4'>
          <img
            src={contentData[activeButton].imageSrc}
            alt={`Image for ${activeButton}`}
            className='w-full h-auto shadow-lg'
          />
        </div>

        {/* Right section (Text description) */}
        <div className='text-start w-full p-4'>
          <p className='font-bold text-[22px]'>
            {contentData[activeButton].title}
          </p>
          <p className='mt-5 text-[16px] tracking-normal font-[400] pb-14'>
            {contentData[activeButton].description}
          </p>
        </div>
      </div>

      {/* Button tabs */}
      <div className='flex justify-center mt-4'>
        {Object.keys(contentData).map(key => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className={`px-4 py-2 mx-1 text-lg font-semibold ${
              activeButton === key
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500'
            } focus:outline-none`}
          >
            {contentData[key].title}
          </button>
        ))}
      </div>
    </div>
  )
}



// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// const contentData = {
//      A: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/Purusham_06-09-221327-1_1000x.jpg?v=1698906747',
//        title: 'Aglow',
//        description:
//          "Tailor-made for the gentleman that you are, Aglow by Purusham is everything you'd need on your wedding day. With class-apart artistry, stunning colors and finest designs, Aglow takes up a very special place in your wedding saga. It's finesse wraps you up in unparalleled luxury and comfort. This sartorial brilliance is made to mesmerize, it is made to stay as a part of your most beautiful memories.Intricately detailed thread work with a perfectly balanced color palette- get ready to be a dapper in the upcoming saga of weddings. Deck up in complete bespoke extravagance, indomitably resplendent, and magnificently charming, deck up in perfection."
//      },
//      B: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/second_1_1000x.jpg?v=1698906746',
//        title: 'Scintilla',
//        description:
//          "Scintillating with grace, this collection finds you shining in your most precious form. Be an epitome of opulence,of significance and of perfection as you let this collection embrace your style. A true testament to impeccable designs and unique artistry, Scintilla by Purusham shimmers glamour to make you stand out of the ordinary. Made with love and precision, it's sure to make you steal the day with your statement style and unwavering elegance. As you adorn the beautiful work of Scintilla, you'll know it's way beyond an ordinary couture, it's an ode to the work of art."
//      },
//      C: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/slide-9_1000x.png?v=1637749547',
//        title: 'Regal Radiance',
//        description:
//          'Since time immemorial, the sun has been revered for being the powerful and fiery force that it is. And while its golden shimmer inspired poetry and literature, its powerful nature inspired rulers. It showed them how power is not about the glory that comes with it. It is about burning with such passion that you light up the whole world.Purusham’s Regal Radiance collection celebrates the mighty spirit of the sun and the Modern Maharajas who resemble this spirit. Through its ethereal and enchanting designs, the collection bestows upon the wearer the sun’s eternal glow and charm.'
//      },
//      D: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/slide-8_1000x.png?v=1637749617',
//        title: 'Regal Crest',
//        description:
//          'Some nights, when the rest of the world had descended into a deep sleep, he stayed up, gazing at the sky. The moon and the stars that had now taken over the sky left him enthralled. For him, they seemed like a window into the vastness of the cosmos- a realm of infinite possibilities and eternal beauty. A realm, where he someday hoped to reach.Years later, on his grand night, a special someone arrived to meet him. And as it entered, he couldn’t believe his eyes. It was his beloved Cosmos! But it had arrived in a rather unusual form - an enchanting Regal Crest outfit. Something that he would forever hold dear to his heart.'
//      },
//      E: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/slide-11_1000x.png?v=1637749694',
//        title: 'Miraan',
//        description:
//          'With a charismatic persona and a penchant for style, he was the quintessential handsome man. Donned in a ravishing attire, he was all set to own the opulent celebration with his elegance and modern masculinity. And when his girl lay her eyes on him, she instantly knew that he was everything she had been waiting for. Her prince charming had arrived!Miraan is a spell that turns a man into a dashing prince. And turns ordinary lives into fairy tales with its dreamy collection.'
//      },
//      F: {
//        imageSrc:
//          'https://purusham.com/cdn/shop/files/slide-10_1000x.png?v=1637749717',
//        title: 'Hampi',
//        description:
//          'In Hampi, a heavenly place in southern India, a slice of the country’s rich past lives through its magnificent ruins. It was once the capital of the mighty and rich Vijayanagar empire, the greatest Hindu empire in the medieval period. Even today, the splendour of this great regime can be felt through its arresting architecture.Purusham’s Hampi collection is inspired by this fantastical city. Like Hampi, it too brings the past to life by reviving traditional Indian craftsmanship and ancient weaving techniques. And excites your imagination, just the way the city does!'
//      }
//    }

// export default function ImageDescriptionSection () {
//   const [activeButton, setActiveButton] = useState('A')

//   const handleButtonClick = buttonKey => {
//     setActiveButton(buttonKey)
//   }

//   return (
//     <div className='container mx-auto p-4 w-8/12'>
//       {/* Main content section */}
//       <div className='flex flex-col md:flex-row items-end gap-8'>
//         {/* Left section (Image) */}
//         <div className='w-full p-4'>
//           <AnimatePresence exitBeforeEnter>
//             <motion.img
//               key={activeButton} // Only re-renders when activeButton changes
//               src={contentData[activeButton].imageSrc}
//               alt={`Image for ${activeButton}`}
//               className='w-full h-auto shadow-lg'
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ duration: 0.5 }}
//             />
//           </AnimatePresence>
//         </div>

//         {/* Right section (Text description) */}
//         <div className='text-start w-full p-4'>
//           <AnimatePresence exitBeforeEnter>
//             <motion.div
//               key={activeButton} // Only re-renders when activeButton changes
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className='font-bold text-[22px]'>
//                 {contentData[activeButton].title}
//               </p>
//               <p className='mt-5 text-[16px] tracking-normal font-[400] pb-14'>
//                 {contentData[activeButton].description}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Button tabs */}
//       <div className='flex justify-center mt-4'>
//         {Object.keys(contentData).map(key => (
//           <button
//             key={key}
//             onClick={() => handleButtonClick(key)}
//             className={`px-4 py-2 mx-1 text-lg font-semibold ${
//               activeButton === key
//                 ? 'border-b-4 border-black text-black'
//                 : 'text-gray-500'
//             } focus:outline-none`}
//           >
//             {contentData[key].title}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }
