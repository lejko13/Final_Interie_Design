import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (currentIndex === null || currentIndex === undefined) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-50 top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Prev arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
               className="absolute bottom-20 left-4 md:top-1/2 md:bottom-auto md:left-8 md:-translate-y-1/2 lg:left-12 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"

            // className="absolute  z-50  bottom-28 left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Main image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-[90vw] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt=""
            className="max-w-full max-h-[60vh] object-contain rounded-lg"
          />
        </motion.div>

        {/* Next arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
   className="absolute bottom-20 right-4 md:top-1/2 md:bottom-auto md:right-8 md:-translate-y-1/2 lg:right-12 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Filmstrip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 z-10 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  // navigate to this index
                  const diff = idx - currentIndex;
                  if (diff > 0) for (let i = 0; i < diff; i++) onNext();
                  if (diff < 0) for (let i = 0; i < Math.abs(diff); i++) onPrev();
                }}
                className={`w-16 h-12 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                  idx === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-6 left-6 z-10 text-white/60 font-body text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}