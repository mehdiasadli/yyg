'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const images = [
  '/cars/rr.jpg',
  '/cars/bentley.jpg',
  '/cars/bugatti.jpg',
  '/cars/ferrari.jpg',
  '/cars/lambo.jpg',
  '/cars/bmw.jpg',
];

export default function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsAnimating(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setPrevIndex(null);
      }, 700); // animation duration
    }, 5000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Add a class that applies blur on small screens, no blur on md+
  const blurClass = 'blur-sm md:blur-none';

  return (
    <div className='absolute inset-0 -z-10 overflow-hidden'>
      {/* Previous image, sliding out */}
      {prevIndex !== null && isAnimating && (
        <Image
          key={images[prevIndex]}
          src={images[prevIndex]}
          alt='background'
          fill
          className={`object-cover absolute inset-0 transition-transform duration-700 ease-in-out ${blurClass}`}
          style={{
            transform: 'translateX(0%)',
            animation: 'slideOutLeft 0.7s forwards',
            zIndex: 1,
          }}
          priority
        />
      )}
      {/* Current image, sliding in */}
      <Image
        key={images[currentIndex]}
        src={images[currentIndex]}
        alt='background'
        fill
        className={`object-cover absolute inset-0 transition-transform duration-700 ease-in-out ${blurClass}`}
        style={{
          transform: isAnimating ? 'translateX(100%)' : 'translateX(0%)',
          animation: isAnimating ? 'slideInRight 0.7s forwards' : undefined,
          zIndex: 2,
        }}
        priority
      />
      {/* dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.7))',
          zIndex: 3,
        }}
        aria-hidden='true'
      />
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0%);
          }
        }
        @keyframes slideOutLeft {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
