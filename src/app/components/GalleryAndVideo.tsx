import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface VideoData {
  id: string;
  thumbnail: string;
  videoUrl?: string;
}

export interface GalleryItem {
  images: {
    src: string;
    orientation?: 'landscape' | 'portrait';
  }[];
  title: string;
  description: string;
  instagramUrl: string;
}

export const GalleryAndVideo = ({ items }: { items: GalleryItem[] }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);
  const gallerySliderRef = useRef<Slider>(null);
  const modalSliderRef = useRef<Slider>(null);

  const videos: VideoData[] = [
    { id: '1', thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW5zcGlyYXRpb258ZW58MHx8fHwxNzc0OTY0ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '2', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwaW5zcGlyYXRpb258ZW58MHx8fHwxNzc0OTY0ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '3', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwaW5zcGlyYXRpb258ZW58MHx8fHwxNzc0OTY0ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '4', thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwaW5zcGlyYXRpb258ZW58MHx8fHwxNzc0OTY0ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '5', thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3ZWRkaW5nJTIwaW5zcGlyYXRpb258ZW58MHx8fHwxNzc0OTY0ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const gallerySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.5,
        }
      }
    ]
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

  return (
    <div className="w-full relative">
      <style>{`
        .gallery-slider .slick-list {
          overflow: visible !important;
          clip-path: inset(-50px -2000% -50px -10px);
        }
        .gallery-slider .slick-track {
          display: flex !important;
        }
      `}</style>

      {/* Gallery Section */}
      <div className="mb-14 flex flex-col gap-3 md:-ml-6 md:mb-32 md:flex-row md:gap-6 lg:-ml-12 lg:gap-10">
        {/* Left Vertical Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-[60px] lg:w-[80px] flex-shrink-0 flex items-start pt-4 z-10 pl-2 md:pl-0"
        >
          <div className="hidden md:block">
            <h2 
              className="font-['Italiana'] text-[clamp(4rem,6vw,6rem)] leading-none text-black whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Gallery
            </h2>
          </div>
          <div className="mb-2 w-full md:hidden">
            <h2 className="font-['Italiana'] text-[3.2rem] leading-none text-black">Gallery</h2>
          </div>
        </motion.div>

        {/* Right Gallery Carousel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-w-0 flex flex-col"
        >
          {/* Constrained container width allowing right-side to overflow */}
          <div className="w-full md:w-[75%] lg:w-[70%]">
            <div className="-mx-2 md:-mx-4">
              <Slider className="gallery-slider !mb-0" ref={gallerySliderRef} {...gallerySettings}>
                {items.map((item) => (
                  <div key={item.instagramUrl} className="px-2 md:px-4 outline-none">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="group relative block w-full cursor-pointer overflow-hidden rounded-lg bg-[#e8e4db] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B78E3F] focus-visible:ring-offset-4"
                    >
                      <div className="aspect-[1.05/1] overflow-hidden">
                      <img 
                        src={item.images[0].src} 
                        alt={item.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                        <p className="font-['Italiana'] text-2xl leading-tight text-white">{item.title}</p>
                        <p className="mt-1 font-['Josefin_Sans'] text-sm font-light text-white/85">Tap to view story</p>
                      </div>
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Controls - taking full width of the parent flex-1 column */}
          <div className="mt-3 flex w-full flex-col items-center gap-3 pr-0 text-center md:mt-4 md:flex-row md:items-center md:justify-between md:pr-8 md:text-left">
            <p className="max-w-[32rem] font-['Josefin_Sans'] text-[15px] font-light tracking-wide text-black md:text-[17px]">
              View more of our portfolio and past creations on{' '}
              <a
                href="https://www.instagram.com/weddwooddesign/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer underline underline-offset-4 transition-colors hover:text-[#B78E3F]"
              >
                Instagram
              </a>
              .
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => gallerySliderRef.current?.slickPrev()}
                className="cursor-pointer w-9 h-9 rounded-full bg-[#A89F95] text-white flex items-center justify-center hover:bg-[#8f857b] transition-colors focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => gallerySliderRef.current?.slickNext()}
                className="cursor-pointer w-9 h-9 rounded-full bg-[#A89F95] text-white flex items-center justify-center hover:bg-[#8f857b] transition-colors focus:outline-none"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="!w-[calc(100vw-2rem)] max-h-[94vh] !max-w-[calc(100vw-2rem)] gap-0 overflow-hidden rounded-lg border-0 bg-white p-0 shadow-2xl xl:!max-w-[1320px]">
            <div className="grid max-h-[94vh] overflow-hidden md:h-[min(760px,calc(100vh-2rem))] md:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
              <div className="relative h-[52vh] overflow-hidden md:h-full">
                <Slider ref={modalSliderRef} {...modalImageSettings} className="h-full [&_.slick-list]:h-full [&_.slick-slide>div]:h-full [&_.slick-slide]:h-full [&_.slick-track]:h-full">
                  {selectedItem.images.map((image, index) => (
                    <div key={image.src} className="h-full">
                      <div className="h-full">
                        <img
                          src={image.src}
                          alt={`${selectedItem.title} ${index + 1}`}
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
              <div className="flex min-h-0 flex-col justify-between gap-8 overflow-y-auto bg-white p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="font-['Italiana'] text-[clamp(2.25rem,4vw,4rem)] font-normal leading-none text-black">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription className="pt-4 font-['Josefin_Sans'] text-[17px] font-light leading-8 text-black">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>
                <a
                  href={selectedItem.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-[#474343] px-6 py-4 font-['Josefin_Sans'] text-lg font-extralight text-white transition-colors hover:bg-[#5a5454]"
                >
                  View Instagram Post
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Video Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Main Video Area */}
        <div className="relative mb-4 aspect-video overflow-hidden rounded-3xl bg-[#9c9489] group cursor-pointer md:mb-6">
          <img 
            src={videos[activeVideoIndex].thumbnail} 
            alt="Main video thumbnail" 
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[30px] border-t-transparent border-l-[50px] border-l-white/90 border-b-[30px] border-b-transparent hover:border-l-white transition-colors" />
          </div>
        </div>

        {/* Thumbnails Carousel */}
        <div className="mt-2 -mx-1 md:mt-4 md:-mx-3">
          <Slider {...thumbnailSettings}>
            {videos.map((video, idx) => (
              <div key={video.id} className="cursor-pointer px-1 py-2 outline-none md:px-3" onClick={() => setActiveVideoIndex(idx)}>
                <div className={`rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] bg-[#9c9489] relative transition-all duration-300 ${activeVideoIndex === idx ? 'ring-2 ring-offset-4 ring-[#C8AE75]' : 'opacity-60 hover:opacity-100'}`}>
                  <img 
                    src={video.thumbnail} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
};
