import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider({ images, title, subtitle, backLink, backLabel, children }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => go((current - 1 + images.length) % images.length), [current, go, images.length]);
  const next = useCallback(() => go((current + 1) % images.length), [current, go, images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section className="relative h-[60vh] md:h-[75vh] overflow-hidden ">
      {/* Images */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.img
          key={current}
          src={images[current]}
          alt={title}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Back link + title */}
      <div className="absolute flex  flex-col  justify-end pb-12 w-full h-full  gap-5">


        <div className=" relative flex flex-col max-w-7xl mx-auto px-4 md:px-8  h-full w-full">
          <span className=' w-full h-full pt-4'>  {backLink}</span>
        
        <div>
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-3"
          >
            {title}
          </motion.h1>

          <span>
             {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-2"
            >
              {subtitle}
            </motion.div>
          )}

          </span>

        </div>
        
         
          {/* {children} */}
        </div>

          <div className='relative flex flex-col max-w-7xl mx-auto px-4 md:px-8 h-fit w-full'>
          {images.length > 1 && (
                <div className="relative  z-10 bg-transparent">
                  <div className="max-w-7xl mx-auto  ">
                    <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-none ">
                      {images.map((img, i) => (
                        <div
                        key={i}
                        onClick={() => go(i)}
                        className="relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden cursor-pointer"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/30 hover:bg-black/50 transition-all duration-300" />
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
          
        </div>


        </div>
      

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute   bottom-[20px]  left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      )}

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
    
    </section>
  );
}