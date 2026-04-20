import { Header } from './components/Header';
import { TestimonialCard } from './components/TestimonialCard';
import { ContactForm } from './components/ContactForm';
import { GalleryAndVideo } from './components/GalleryAndVideo';
import { ChevronDown, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

// Import brand and content images
import imgWNewLogoJpg1 from '../imports/Desktop1-1/006ee68b0114e4d35a01a249b6cbf58c348daa03.png';
import aboutUsBanner from '../assets/about-us-banner.png';
import supportImage from '../assets/support-image.png';
import planWithUs from '../assets/plan-with-us.png';
import styleWithUs from '../assets/style-with-us.png';
import dressWithUs from '../assets/dress-with-us.png';
import celebrateAndCreate from '../assets/celebrate-and-create.png';
import bloomInStyle from '../assets/bloom-in-style.png';
import styleSpaces from '../assets/style-spaces.png';
import launchWithUs from '../assets/launching.png';
import galleryChiehApril from '../assets/gallery-instagram/chieh-april.jpg';
import galleryAndreMelissa from '../assets/gallery-instagram/andre-melissa.jpg';
import galleryMorganKellyVintage from '../assets/gallery-instagram/morgan-kelly-vintage.jpg';
import galleryChongCamellia from '../assets/gallery-instagram/chong-camellia.jpg';

const galleryImageModules = import.meta.glob('../assets/gallery-instagram/full/*.{jpg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function galleryImage(fileName: string) {
  const image = galleryImageModules[`../assets/gallery-instagram/full/${fileName}`];

  if (!image) {
    throw new Error(`Missing gallery image: ${fileName}`);
  }

  return image;
}

function galleryImageSet(prefix: string, count: number, extension = 'jpg') {
  return Array.from({ length: count }, (_, index) => ({
    src: galleryImage(`${prefix}-${String(index + 1).padStart(2, '0')}.${extension}`),
  }));
}

export default function App() {
  const experienceItems = [
    {
      image: planWithUs,
      imageClassName: 'object-contain',
      title: 'Plan With Us',
      description: 'We provide thoughtful guidance throughout your wedding journey, from venue selection and trusted vendor coordination to seamless planning and on-the-day execution. Every detail is managed with precision to ensure a smooth and meaningful experience.'
    },
    {
      image: styleWithUs,
      title: 'Style With Us',
      description: 'We curate refined wedding styling through intentional design, atmosphere, and detail. Each concept is thoughtfully developed to reflect your vision with elegance, balance, and visual harmony.'
    },
    {
      image: dressWithUs,
      title: 'Dress With Us',
      description: 'We curate gowns and suits with a focus on refinement, fit, and timeless elegance. Each selection is guided by style, comfort, and individuality.'
    },
    {
      image: celebrateAndCreate,
      title: 'Celebrate & Create With Us',
      description: 'We design birthday celebrations and proposals as intimate and meaningful experiences, shaped by personal stories and emotion. Every detail is thoughtfully considered to create a moment that feels sincere, intentional, and unforgettable.'
    },
    {
      image: bloomInStyle,
      title: 'Bloom in Style With Us',
      description: 'We design floral concepts that bring softness, texture, and elegance into every celebration. With a focus on customised floral forms and sculptural arrangements, each piece is thoughtfully curated to complement your theme and elevate the overall atmosphere with refined detail.'
    },
    {
      image: styleSpaces,
      title: 'Style Spaces With Us',
      description: 'We design and transform hotel and mall spaces into refined visual experiences for seasonal campaigns, festive displays, and brand activations. Each space is thoughtfully curated with balance, atmosphere, and detail to create a lasting visual impression.'
    },
    {
      image: launchWithUs,
      title: 'Launch With Us',
      description: 'We deliver impactful event experiences for roadshows, openings, and corporate launches. Each setup is executed with precision, clarity, and strong visual presence.'
    }
  ];

  const testimonials = [
    {
      quote: '"Everything looked so refined and beautifully arranged. Our guests kept asking who styled the event."',
      client: 'Client 01'
    },
    {
      quote: '"The attention to detail was incredible. Every corner was thoughtfully designed."',
      client: 'Client 02'
    },
    {
      quote: '"Professional, creative, and absolutely stunning results. Highly recommend!"',
      client: 'Client 03'
    }
  ];

  const galleryItems = [
    {
      images: [
        { src: galleryChiehApril },
        ...galleryImageSet('chieh-april', 6),
      ],
      title: 'Chieh & April',
      description: 'A simple, clean Korean-inspired wedding at Sheraton Kuching, balanced with luminous details, neon reflections, fairy crystals, and a carefully crafted arch.',
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DMHgSLTPCiw/'
    },
    {
      images: [
        { src: galleryAndreMelissa },
        ...galleryImageSet('andre-melissa-part-1', 6),
        ...galleryImageSet('andre-melissa-part-2', 9, 'webp'),
      ],
      title: 'Andre & Melissa',
      description: "A personalised beach wedding at Pantai Puteri, Santubong, planned around the couple's story with crafted details, a rain-cleared ceremony, and soft romantic moments by the sea.",
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/CuTThVzP9sh/'
    },
    {
      images: [
        ...galleryImageSet('hao-beatrice-reception', 7),
        ...galleryImageSet('hao-beatrice-rom', 4),
      ],
      title: 'Hao & Beatrice',
      description: 'A Cove 55 celebration moving from warm autumn ROM florals to a forestry-inspired reception with natural arrangements, guest-friendly flow, crystal balls, and delicate fairy lights.',
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DWfyVQiD3-x/'
    },
    {
      images: [
        { src: galleryMorganKellyVintage },
        ...galleryImageSet('morgan-kelly-vintage', 8),
        ...galleryImageSet('morgan-kelly-old-courthouse', 4),
        ...galleryImageSet('morgan-kelly-house', 1),
      ],
      title: 'Morgan & Kelly',
      description: "A multi-theme wedding day layered with vintage styling, Old Courthouse character, bold colour choices, a handcrafted oval gold backdrop, and an oversized Double Happiness installation.",
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DVfihSDD8mA/'
    },
    {
      images: [
        { src: galleryChongCamellia },
        ...galleryImageSet('chong-camellia', 5),
      ],
      title: 'Chong & Camellia',
      description: "A bespoke reception concept with subtle Chinese elements, rabbit motifs from the couple's zodiac signs, and fireworks inspired by their lion dance performance.",
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DVfcMyjD3Jn/'
    },
    {
      images: galleryImageSet('cherry-on-top', 12),
      title: 'Cherry on Top',
      description: 'A styled shoot brought to life from mood board and sketches, pairing cherry-inspired decoration, custom gown styling, magical makeup, and cinematic photography.',
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DKJUKDdPj6r/'
    },
    {
      images: galleryImageSet('baby-shower', 1),
      title: 'Baby Shower',
      description: 'A sweet surprise baby shower at Sheraton Kuching, crafted with soft colour details and handmade name tags for a simple, pretty, meaningful celebration.',
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DMc8wlBvxYF/'
    },
    {
      images: galleryImageSet('first-birthday-rabbit', 1),
      title: 'First Birthday',
      description: 'A whimsical first birthday celebration for a returning wedding couple, filled with soft florals and rabbit details for their little one.',
      instagramUrl: 'https://www.instagram.com/weddwooddesign/p/DMc_gKlv9X0/'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <div>
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-22 md:px-12 md:pb-20 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[750px] mx-auto w-full"
        >
          <img 
            src={imgWNewLogoJpg1} 
            alt="Weddwood Design Logo" 
            className="w-full h-auto mix-blend-multiply"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.15, delay: 1.2 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce md:bottom-12"
        >
          <p className="font-['Josefin_Sans'] font-extralight text-lg text-black">
            Scroll to explore
          </p>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About and Experience Section */}
      <section id="about" className="relative mx-auto max-w-[1680px] px-4 py-12 md:px-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.15, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <img
            src={aboutUsBanner}
            alt="A lush Weddwood floral installation"
            className="h-[220px] w-full object-cover md:h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.15, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl py-12 text-center md:py-16"
        >
          <h2 className="font-['Italiana'] text-[clamp(2.15rem,3.8vw,3.55rem)] leading-[1.08] text-black">
            We Plan. We Style. You Celebrate.
          </h2>
          <p className="mx-auto mt-7 max-w-4xl font-['Josefin_Sans'] text-[16px] font-extralight leading-[1.95] text-black md:text-[18px]">
            WW is a group of creatives with a total 20 years experience in art, craft and design. As an all-round creative agency, we share our eyes, our passions and our ideas to bring out the most impactful presentation in visual, textural and spatial artistry.
          </p>
          <div className="mx-auto my-8 h-14 w-px bg-[#d8d2cb]" aria-hidden="true" />
          <p className="mx-auto max-w-3xl font-['Josefin_Sans'] text-[16px] font-extralight leading-[1.95] text-black md:text-[18px]">
            We keep adding new touches to keep it a special event. Its all about details, memories and expectation. Let us help you create the most wonderful memory on your special day.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[1280px] items-end justify-center gap-12 py-8 md:grid-cols-[minmax(320px,1fr)_minmax(360px,0.88fr)] md:gap-10 md:py-16 lg:gap-16 xl:max-w-[1472px] xl:grid-cols-[minmax(0,742px)_minmax(480px,590px)] xl:gap-24 2xl:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-tr-[5rem] md:h-[430px] lg:h-[560px] xl:h-[650px] 2xl:h-[750px] 2xl:rounded-tr-[7rem]"
          >
            <img
              src={supportImage}
              alt="A styled table setting with candles and florals"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[620px] text-right md:mx-0 md:justify-self-center md:self-end"
          >
            <h2 className="font-['Italiana'] text-[clamp(2rem,2.8vw,2.75rem)] leading-[1.15] text-black">
              The Journey with WW
            </h2>
            <div className="ml-auto mt-8 max-w-[590px] space-y-8 font-['Josefin_Sans'] text-[15px] font-extralight leading-[2.15] tracking-[0.02em] text-black md:text-[16px]">
              <p className="ml-auto max-w-[560px]">
                has never been just about planning and decoration. It's about the conversations, the ideas, the challenges, and the little moments we share along the way.
              </p>
              <p className="ml-auto max-w-[590px]">
                For us, it's always about creating something truly special something that reflects who you are as a couple and turns your celebration into a memory that lasts forever.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="hidden">
          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:col-start-6"
          >
            <h2 className="font-['Italiana'] text-[clamp(2.75rem,4vw,4rem)] leading-[1.1] text-black">
              We design celebrations that feel intentional, elegant, and deeply personal.
            </h2>
          </motion.div>
          
          {/* Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-5 md:col-span-5 md:col-start-1 md:pl-8 [&>span:first-of-type]:hidden [&>div>span:last-of-type]:hidden"
          >
            <span className="absolute left-0 -top-2 text-[60px] leading-none font-serif text-[#C8AE75]">“</span>
            <span className="absolute left-0 top-0 block font-serif text-[48px] leading-none text-[#C8AE75] md:left-1">&ldquo;</span>
            <p className="max-w-[620px] font-['Josefin_Sans'] font-extralight italic text-[20px] md:text-[24px] text-[#B78E3F] leading-[1.65] tracking-[0.01em]">
              The most memorable events are never only beautiful. They feel cohesive, welcoming, and thoughtfully considered from the first impression to the final photo.
            </p>
            <div className="flex justify-end">
              <span className="font-serif text-[48px] leading-none text-[#C8AE75]">&rdquo;</span>
              <span className="text-[60px] leading-none font-serif text-[#C8AE75]">”</span>
            </div>
          </motion.div>
          
          {/* Paragraph */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:col-start-6"
          >
            <p className="font-['Josefin_Sans'] font-extralight text-[17px] md:text-[19px] text-black leading-[2.2]">
              Weddwood Design brings together decoration, styling, and event planning to help clients host weddings and celebrations with confidence. Our focus is on creating a polished atmosphere that reflects your taste while making the day feel seamless for every guest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative mx-auto max-w-[1680px] px-4 pb-14 pt-2 md:px-10 md:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center font-['Italiana'] text-[clamp(2rem,3vw,2.85rem)] leading-[1.1] text-black md:mb-14"
        >
          The WW Experience
        </motion.h2>

        <div className="space-y-20 md:space-y-28">
          <div className="grid gap-x-7 gap-y-16 md:grid-cols-3">
            {experienceItems.slice(0, 3).map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.25, delay: 0.35 + index * 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                <div className="mb-5 aspect-[1/1] overflow-hidden bg-[#e9e6df] md:mb-6">
                  <img src={item.image} alt={item.title} className={`h-full w-full ${item.imageClassName ?? 'object-cover'}`} />
                </div>
                <h3 className="mb-4 font-['Josefin_Sans'] text-[clamp(1.25rem,1.55vw,1.55rem)] font-normal leading-[1.2] text-black md:mb-5">
                  {item.title}
                </h3>
                <p className="font-['Josefin_Sans'] text-[15px] font-extralight leading-[1.85] text-black md:text-[16px]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="grid gap-x-7 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
            {experienceItems.slice(3).map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.25, delay: 0.4 + index * 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                <div className="mb-5 aspect-[1/1] overflow-hidden bg-[#e9e6df] md:mb-6">
                  <img src={item.image} alt={item.title} className={`h-full w-full ${item.imageClassName ?? 'object-cover'}`} />
                </div>
                <h3 className="mb-4 font-['Josefin_Sans'] text-[clamp(1.2rem,1.45vw,1.45rem)] font-normal leading-[1.2] text-black md:mb-5">
                  {item.title}
                </h3>
                <p className="font-['Josefin_Sans'] text-[15px] font-extralight leading-[1.85] text-black md:text-[16px]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative mx-auto max-w-[1680px] overflow-hidden px-4 py-14 md:px-10 md:py-20">
        <GalleryAndVideo items={galleryItems} />
      </section>

      {/* Testimonials Section */}
      <section className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-12 md:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Italiana'] text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-black text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          Trust grows faster when the experience feels as good as it looks.
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-12 md:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Italiana'] text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-black max-w-2xl mb-12 md:mb-16"
        >
          Let's create an event experience that feels worth remembering.
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="overflow-hidden rounded-3xl aspect-[5/4] border border-[#d8c29a]/60 bg-[#f7f3ec]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.443347171557!2d110.36229929999999!3d1.5042522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31fba7298f570ff3%3A0x4f3bd1bb86741a79!2sWeddwood%20Event%20Management!5e0!3m2!1sen!2smy!4v1774971643060!5m2!1sen!2smy"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Weddwood Event Management location"
                className="h-full w-full"
              />
            </div>
            
            <div className="space-y-4">
              <p className="font-['Josefin_Sans'] font-extralight text-xl text-black">
                Contact: +60 16-850 7826
              </p>
              <p className="font-['Josefin_Sans'] font-extralight text-xl text-black">
                Email: weddwooddesign@gmail.com
              </p>
              
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://www.facebook.com/weddwood/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#9C8D8D] hover:text-black transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.instagram.com/weddwooddesign/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#9C8D8D] hover:text-black transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 md:mt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mx-auto max-w-[1440px] px-4 py-7 md:px-12 md:py-8"
        >
          <p className="font-['Josefin_Sans'] font-extralight text-sm text-black text-center">
            © 2026 Weddwood Design. All rights reserved.
          </p>
        </motion.div>
      </footer>
      </div>
    </div>
  );
}
