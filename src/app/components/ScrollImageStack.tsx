import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollImageStackProps {
  images: string[];
  title?: ReactNode;
  description?: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ScrollImageStack({ images, title, description }: ScrollImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollDistance = Math.max(rect.height - viewportHeight, 1);
      const progress = clamp(-rect.top / totalScrollDistance, 0, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  const rotations = [3.88, -2.03, 1.5, -1.2, 2.5];
  const stagedProgress = scrollProgress * images.length;

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

          <div className="relative h-[min(438px,72vw)] w-full shrink-0 lg:h-[min(438px,55vw)] lg:w-[min(690px,85vw)] lg:col-start-1 lg:row-start-2">
            <div className="absolute -left-20 -top-20 -z-10 h-[120%] w-[120%] rounded-[50%] bg-[#E5E1CF]/40 blur-[80px]" />

            {images.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 overflow-hidden rounded-[41px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] will-change-transform"
                style={(() => {
                  const distance = stagedProgress - index;
                  const rotation = rotations[index % rotations.length];
                  const lateralShift = index % 2 === 0 ? -10 : 10;
                  const isLastImage = index === images.length - 1;

                  if (distance <= -1) {
                    return {
                      transform: `translate3d(${lateralShift * 0.5}px, 48px, 0) rotate(${rotation}deg) scale(0.9)`,
                      opacity: 0,
                      zIndex: images.length - index,
                      filter: 'blur(6px) brightness(0.7)',
                    };
                  }

                  if (distance < 0) {
                    const t = distance + 1;
                    return {
                      transform: `translate3d(${lateralShift * (1 - t)}px, ${48 * (1 - t)}px, 0) rotate(${rotation}deg) scale(${0.9 + t * 0.1})`,
                      opacity: 0.18 + t * 0.82,
                      zIndex: images.length + index,
                      filter: `blur(${6 * (1 - t)}px) brightness(${0.72 + t * 0.28})`,
                    };
                  }

                  if (isLastImage) {
                    return {
                      transform: `translate3d(0, 0, 0) rotate(${rotation}deg) scale(1)`,
                      opacity: 1,
                      zIndex: images.length + 20,
                      filter: 'none',
                    };
                  }

                  if (distance < 1) {
                    const t = distance;
                    return {
                      transform: `translate3d(${lateralShift * t}px, ${-72 * t}px, 0) rotate(${rotation}deg) scale(${1 + t * 0.05})`,
                      opacity: 1 - t * 0.92,
                      zIndex: images.length + 10 - index,
                      filter: `blur(${5 * t}px) brightness(${1 - t * 0.34})`,
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
