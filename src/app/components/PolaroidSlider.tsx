import Slider from 'react-slick';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { GalleryItem } from './GalleryAndVideo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categoryOrder = ['Weddings', 'Celebrations', 'Bloom in Style', 'Spaces', 'Launches'];

const categoryIntros: Record<string, { title: string; description: string }> = {
  Weddings: {
    title: 'Every love, told differently.',
    description:
      'Every wedding we’ve been part of has its own heartbeat. A couple’s inside jokes woven into the florals, a colour palette chosen because it reminded them of somewhere they fell in love, a table layout that felt like them before guests even sat down. This is our portfolio, but really, it’s theirs. Walk through it with us and you’ll find that no two days look alike, because no two people are.',
  },
  'Bloom in Style': {
    title: 'Where Flowers Become Feelings',
    description:
      'Creating bouquets that go beyond beauty, adding dimension, personality, and a unique style to every floral arrangement.',
  },
  Celebrations: {
    title: 'Celebrate Every Occasion with Intention',
    description:
      'Every celebration deserves its own story. Through thoughtful styling, meaningful details, and unforgettable experiences, we bring every gathering to life with a true sense of occasion',
  },
};

function getVisiblePolaroidSlides() {
  if (typeof window === 'undefined') {
    return 5;
  }

  if (window.innerWidth < 768) {
    return 1;
  }

  if (window.innerWidth < 1024) {
    return 3;
  }

  if (window.innerWidth < 1280) {
    return 4;
  }

  return 5;
}

export function PolaroidSlider({ items }: { items: GalleryItem[] }) {
  const sliderRef = useRef<Slider>(null);
  const modalSliderRef = useRef<Slider>(null);
  const categories = categoryOrder.filter((category) =>
    items.some((item) => (item.category ?? 'Weddings') === category),
  );
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'Weddings');
  const activeIntro = categoryIntros[activeCategory] ?? categoryIntros.Weddings;
  const filteredItems = items.filter((item) => (item.category ?? 'Weddings') === activeCategory);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);
  const [isCardCursorVisible, setIsCardCursorVisible] = useState(false);
  const [cardCursorPosition, setCardCursorPosition] = useState({ x: 0, y: 0 });
  const [visibleSlides, setVisibleSlides] = useState(getVisiblePolaroidSlides);
  const canScroll = filteredItems.length > visibleSlides;
  const selectedItemText = selectedItem?.postDescription ?? selectedItem?.description;
  const hasSelectedItemDetails = Boolean(selectedItem?.title || selectedItemText || selectedItem?.instagramUrl);

  const isMobileSlider = visibleSlides === 1;
  const sliderSettings = {
    dots: false,
    infinite: canScroll,
    speed: 650,
    slidesToShow: visibleSlides,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 8,
    centerMode: isMobileSlider,
    centerPadding: isMobileSlider ? '9%' : '0px',
    focusOnSelect: isMobileSlider,
  };
  const modalImageSettings = {
    dots: false,
    infinite: selectedItem ? selectedItem.images.length > 1 : false,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_current: number, next: number) => setActiveModalImageIndex(next),
  };

  useEffect(() => {
    setActiveModalImageIndex(0);
    modalSliderRef.current?.slickGoTo(0);
  }, [selectedItem]);

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
    setSelectedItem(null);
    setIsCardCursorVisible(false);
  }, [activeCategory]);

  useEffect(() => {
    const updateVisibleSlides = () => setVisibleSlides(getVisiblePolaroidSlides());

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  const moveCardCursor = (event: MouseEvent<HTMLButtonElement>) => {
    setCardCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <section className="relative mx-auto max-w-[1680px] overflow-hidden px-4 py-14 md:px-10 md:py-20">
      <style>{`
        .polaroid-slider .slick-list {
          overflow: visible !important;
          clip-path: inset(-60px -2000% -70px -16px);
        }
        .polaroid-slider .slick-track {
          display: flex !important;
          align-items: stretch;
        }
        .polaroid-slider .slick-slide {
          position: relative;
          z-index: 1;
        }
        .polaroid-slider .slick-slide:hover {
          z-index: 30;
        }
        .polaroid-slider .slick-slide > div {
          height: 100%;
        }
        @media (max-width: 767px) {
          .polaroid-slider .slick-list {
            overflow: hidden !important;
            clip-path: none;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-2xl">
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio categories">
              {categories.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    onClick={() => setActiveCategory(category)}
                    className={`cursor-pointer border px-4 py-2 font-['Josefin_Sans'] text-sm font-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-[#474343] bg-[#474343] text-white'
                        : 'border-[#d9cec0] bg-white text-[#54493f] hover:bg-[#f4ede4]'
                    }`}
                    aria-selected={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
          <motion.div
            key={activeCategory}
            role="tabpanel"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={categories.length > 1 ? 'mt-7' : ''}
          >
            <h2 className="font-['Josefin_Sans'] text-[clamp(2.2rem,4vw,3.3rem)] font-light leading-[1.08] text-black">
              {activeIntro.title}
            </h2>
            <p className="mt-4 max-w-xl font-['Josefin_Sans'] text-[15px] font-extralight leading-[1.9] text-black md:text-[16px]">
              {activeIntro.description}
            </p>
          </motion.div>
        </div>
        {canScroll && (
          <div className="flex gap-3 max-[1023px]:hidden">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#d9cec0] bg-white text-black transition-colors hover:bg-[#f4ede4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F] focus-visible:ring-offset-2"
              aria-label="View previous polaroids"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#d9cec0] bg-white text-black transition-colors hover:bg-[#f4ede4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F] focus-visible:ring-offset-2"
              aria-label="View next polaroids"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-[767px]:mx-0 md:-mx-14"
      >
        {canScroll && (
          <div className="pointer-events-none absolute inset-y-0 left-8 right-8 z-40 hidden items-center justify-between max-[1023px]:flex">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#d9cec0] bg-white/90 text-black shadow-[0_8px_20px_rgba(91,70,48,0.12)] transition-colors hover:bg-[#f4ede4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F]"
              aria-label="View previous polaroids"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#d9cec0] bg-white/90 text-black shadow-[0_8px_20px_rgba(91,70,48,0.12)] transition-colors hover:bg-[#f4ede4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F]"
              aria-label="View next polaroids"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
        <Slider key={`${activeCategory}-${visibleSlides}`} ref={sliderRef} {...sliderSettings} className="polaroid-slider !mb-0">
          {filteredItems.map((item, index) => {
            const arrangements = [
              '-rotate-[5deg] translate-y-5',
              'rotate-[3deg] -translate-y-3',
              '-rotate-[2deg] translate-y-2',
              'rotate-[5deg] translate-y-6',
              '-rotate-[4deg] -translate-y-4',
              'rotate-[1.5deg] translate-y-4',
              '-rotate-[6deg] -translate-y-2',
            ];
            const arrangement = arrangements[index % arrangements.length];
            const hasItemPopup = Boolean(item.title || item.description || item.postDescription || item.instagramUrl);
            const Wrapper = hasItemPopup ? 'button' : 'div';

            return (
              <div key={`${item.instagramUrl ?? item.title ?? item.images[0].src}-${index}`} className="px-1 py-7 outline-none md:px-1">
                <Wrapper
                  {...(hasItemPopup
                    ? {
                        type: 'button',
                        onClick: () => setSelectedItem(item),
                        onMouseEnter: (event: MouseEvent<HTMLButtonElement>) => {
                          moveCardCursor(event);
                          setIsCardCursorVisible(true);
                        },
                        onMouseMove: moveCardCursor,
                        onMouseLeave: () => setIsCardCursorVisible(false),
                        'aria-label': item.title ? `Open ${item.title} story` : 'Open portfolio image',
                      }
                    : {})}
                  className={`group relative -mx-10 h-full min-h-[320px] origin-bottom transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[767px]:mx-0 max-[767px]:min-h-[240px] max-[767px]:translate-y-0 max-[767px]:rotate-0 md:-mx-13 ${
                    hasItemPopup
                      ? 'cursor-none hover:z-20 hover:-translate-y-8 hover:rotate-[1deg] hover:scale-[1.05]'
                      : ''
                  } ${arrangement}`}
                >
                  <div className="absolute inset-x-5 bottom-2 top-6 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(91,70,48,0.16)_0%,rgba(91,70,48,0.1)_34%,rgba(91,70,48,0.04)_60%,rgba(91,70,48,0)_80%)] blur-2xl opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,244,0)_58%,rgba(255,250,244,0.28)_74%,rgba(255,250,244,0.72)_88%,rgba(255,250,244,0.96)_100%)] opacity-85 transition-opacity duration-500 group-hover:opacity-65" aria-hidden="true" />
                  <div className="relative flex h-full min-h-[320px] flex-col bg-[#fffaf4] p-3 pb-4 shadow-[0_14px_28px_rgba(91,70,48,0.1),0_30px_58px_rgba(91,70,48,0.07)] ring-1 ring-[#eee1d2]/40 max-[767px]:min-h-[240px]">
                    <div className="aspect-[0.9/1] overflow-hidden bg-[#e8ddd1] max-[767px]:aspect-[1.28/1]">
                      <img
                        src={item.images[0].src}
                        alt={item.title ?? 'Portfolio image'}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    {(item.title || item.description) && (
                      <div className="flex flex-1 flex-col justify-between px-2 pt-4">
                        <div>
                          {item.title && (
                            <h3 className="font-['Josefin_Sans'] text-[1.5rem] font-light leading-tight text-black">
                              {item.title}
                            </h3>
                          )}
                          {item.description && (
                            <p className="mt-2 font-['Josefin_Sans'] text-sm font-light leading-[1.7] text-[#54493f]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Wrapper>
              </div>
            );
          })}
        </Slider>
      </motion.div>

      {isCardCursorVisible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-19 w-19 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#474343] bg-[#474343] font-['Josefin_Sans'] text-[11px] font-light uppercase tracking-[0.22em] text-white shadow-[0_12px_30px_rgba(71,67,67,0.2)] md:flex"
          animate={{ x: cardCursorPosition.x, y: cardCursorPosition.y }}
          initial={false}
          transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.28 }}
        >
          Click
        </motion.div>
      )}

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="!w-[calc(100vw-2rem)] max-h-[94vh] !max-w-[calc(100vw-2rem)] gap-0 overflow-hidden rounded-lg border-0 bg-white p-0 shadow-2xl xl:!max-w-[1320px]">
            <div className={`grid max-h-[94vh] overflow-hidden md:h-[min(760px,calc(100vh-2rem))] ${hasSelectedItemDetails ? 'md:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]' : ''}`}>
              <div className="relative h-[52vh] overflow-hidden bg-[#f7f3ec] md:h-full">
                <Slider ref={modalSliderRef} {...modalImageSettings} className="h-full [&_.slick-list]:h-full [&_.slick-slide>div]:h-full [&_.slick-slide]:h-full [&_.slick-track]:h-full">
                  {selectedItem.images.map((image, index) => (
                    <div key={image.src} className="h-full">
                      <div className="h-full">
                        <img
                          src={image.src}
                          alt={selectedItem.title ? `${selectedItem.title} ${index + 1}` : `Portfolio image ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="block h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => modalSliderRef.current?.slickPrev()}
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-black shadow-lg transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F]"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => modalSliderRef.current?.slickNext()}
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/85 text-black shadow-lg transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F]"
                      aria-label="Next image"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2 shadow-lg">
                      {selectedItem.images.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => modalSliderRef.current?.slickGoTo(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${activeModalImageIndex === index ? 'bg-black' : 'bg-black/25 hover:bg-black/50'}`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {hasSelectedItemDetails && (
                <div className="flex min-h-0 flex-col justify-between gap-8 overflow-y-auto bg-white p-6 md:p-8">
                  <DialogHeader>
                    {selectedItem.title && (
                      <DialogTitle className="font-['Josefin_Sans'] text-[clamp(1.5rem,2.4vw,1.75rem)] font-light leading-[1.18] text-black">
                        {selectedItem.title}
                      </DialogTitle>
                    )}
                    {selectedItemText && (
                      <DialogDescription className="mt-4 max-h-[28vh] overflow-y-auto whitespace-pre-line pr-3 font-['Josefin_Sans'] text-[16px] font-light leading-8 text-black md:max-h-[390px] md:text-[17px]">
                        {selectedItemText}
                      </DialogDescription>
                    )}
                  </DialogHeader>
                  {selectedItem.instagramUrl && (
                    <a
                      href={selectedItem.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-[#474343] px-6 py-4 font-['Josefin_Sans'] text-lg font-extralight text-white transition-colors hover:bg-[#5a5454]"
                    >
                      View Instagram Post
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
