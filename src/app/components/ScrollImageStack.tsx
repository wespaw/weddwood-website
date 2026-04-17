import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollImageStackProps {
  images: string[];
  title?: ReactNode;
  description?: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ScrollImageStack({ images, title, description }: ScrollImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeImageIndexRef = useRef(0);
  const snapLockRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const scrollToImageIndex = (index: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalScrollDistance = Math.max(containerRef.current.offsetHeight - window.innerHeight, 1);
    const targetProgress = images.length <= 1 ? 0 : index / (images.length - 1);

    window.scrollTo({
      top: sectionTop + totalScrollDistance * targetProgress,
      behavior: 'auto',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollDistance = Math.max(rect.height - viewportHeight, 1);
      const progress = clamp(-rect.top / totalScrollDistance, 0, 1);
      const nextIndex = clamp(Math.round(progress * (images.length - 1)), 0, images.length - 1);

      setScrollProgress(progress);

      if (snapLockRef.current) return;

      setActiveImageIndex(nextIndex);
      activeImageIndexRef.current = nextIndex;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!containerRef.current || images.length <= 1) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isStackPinned = rect.top <= 1 && rect.bottom >= viewportHeight - 1;

      if (!isStackPinned || Math.abs(event.deltaY) < 10) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = activeImageIndexRef.current;
      const nextIndex = clamp(currentIndex + direction, 0, images.length - 1);

      if (nextIndex === currentIndex) return;

      event.preventDefault();

      if (snapLockRef.current) return;

      snapLockRef.current = true;
      activeImageIndexRef.current = nextIndex;
      setActiveImageIndex(nextIndex);
      scrollToImageIndex(nextIndex);

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 720);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [images.length]);

  const rotations = [3.88, -2.03, 1.5, -1.2, 2.5];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${images.length * 100 + 32}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-visible py-16 md:py-24">
        <div className="grid w-full items-center gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.72fr)] lg:grid-rows-[auto_1fr]">
          {title && (
            <div
              className="w-full max-w-none lg:col-start-1 lg:row-start-1 lg:max-w-4xl"
              style={{
                opacity: clamp(1 - scrollProgress * 0.18, 0.82, 1),
                transform: `translateY(${scrollProgress * -16}px)`,
              }}
            >
              {title}
            </div>
          )}

          <div className="relative aspect-[24/17] w-full shrink-0 lg:w-[min(690px,85vw)] lg:col-start-1 lg:row-start-2">
            <div className="absolute -left-20 -top-20 -z-10 h-[120%] w-[120%] rounded-[50%] bg-[#E5E1CF]/40 blur-[80px]" />

            {images.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 overflow-hidden rounded-[41px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                style={(() => {
                  const distance = activeImageIndex - index;
                  const rotation = rotations[index % rotations.length];
                  const lateralShift = index % 2 === 0 ? -10 : 10;

                  if (distance < 0) {
                    return {
                      transform: `translate3d(${lateralShift * 0.5}px, 48px, 0) rotate(${rotation}deg) scale(0.92)`,
                      opacity: 0,
                      zIndex: images.length - index,
                      filter: 'blur(6px) brightness(0.7)',
                    };
                  }

                  if (distance === 0) {
                    return {
                      transform: `translate3d(0, 0, 0) rotate(${rotation}deg) scale(1)`,
                      opacity: 1,
                      zIndex: images.length + 20,
                      filter: 'none',
                    };
                  }

                  return {
                    transform: `translate3d(${lateralShift}px, -72px, 0) rotate(${rotation}deg) scale(1.05)`,
                    opacity: 0,
                    zIndex: images.length - index,
                    filter: 'blur(5px) brightness(0.66)',
                  };
                })()}
              >
                <img
                  src={image}
                  alt={`Wedding decoration ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {description && (
            <div
              className="w-full max-w-none lg:col-start-2 lg:row-start-2 lg:max-w-md lg:self-center"
              style={{
                opacity: clamp(0.92 - scrollProgress * 0.12, 0.72, 0.92),
                transform: `translateY(${12 - scrollProgress * 18}px)`,
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
