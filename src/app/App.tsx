import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { TestimonialCard } from './components/TestimonialCard';
import { ContactForm } from './components/ContactForm';
import { ScrollImageStack } from './components/ScrollImageStack';
import { GalleryAndVideo } from './components/GalleryAndVideo';
import { ChevronDown, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

// Import images from Figma
import imgWNewLogoJpg1 from '../imports/Desktop1-1/006ee68b0114e4d35a01a249b6cbf58c348daa03.png';
import imgRectangle2 from '../imports/Desktop1-1/78b8aec9bd0ada37c7af32d7fce3f940eeca8e41.png';
import imgRectangle3 from '../imports/Desktop1-1/109b38587a30fd9d38d4d26ae92cbd2d46b3294c.png';
import imgRectangle4 from '../imports/Desktop1-1/c07235b63d9f19405366b42b109578caf46b800a.png';
import imgRectangle5 from '../imports/Desktop1-1/95b2f87ef6d107ef9459b2f71aaf0c7355188c4f.png';
import imgRectangle6 from '../imports/Desktop1-1/bb28f07ed4c69f84b047730f68bcc9ee06d090fe.png';
import imgRectangle7 from '../imports/Desktop1-1/db277639cbc75a670e63759c310d443df331ad65.png';
import imgChatGptImageMar302026082227Pm3 from '../imports/Desktop1-1/9346c396804208163b721c7c5286018408d0262e.png';
import serviceIcon01 from '../assets/service-icon-01.png';
import serviceIcon02 from '../assets/service-icon-02.png';
import serviceIcon03 from '../assets/service-icon-03.png';
import serviceIcon04 from '../assets/service-icon-04.png';
import serviceIcon05 from '../assets/service-icon-05.png';
import serviceIcon06 from '../assets/service-icon-06.png';

export default function App() {
  const services = [
    {
      icon: serviceIcon01,
      title: 'Wedding Decoration',
      description: 'Elegant aisle setups, reception styling, stage backdrops, florals, tablescapes, and cohesive design concepts for modern couples.'
    },
    {
      icon: serviceIcon02,
      title: 'Event Planning',
      description: 'Structured planning support for timelines, flow, venue coordination, and overall event experience from concept to execution.'
    },
    {
      icon: serviceIcon03,
      title: 'Birthday & Private Parties',
      description: 'Sophisticated celebration styling for milestone birthdays, intimate gatherings, engagement events, and family occasions.'
    },
    {
      icon: serviceIcon04,
      title: 'Roadshows & Brand Events',
      description: 'Professional, high-visibility setups that help brands stand out with confidence in retail, campaign, and experiential environments.'
    },
    {
      icon: serviceIcon05,
      title: 'Gown & Suit Rental',
      description: 'A thoughtfully selected collection of gowns and suits, offering timeless elegance and a seamless fit for your most memorable occasions.'
    },
    {
      icon: serviceIcon06,
      title: 'Custom Concept Styling',
      description: 'Bespoke mood boards, decorative direction, and curated finishes designed around your theme, audience, and venue.'
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

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <div>
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-22 md:px-12 md:pb-20 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce md:bottom-12"
        >
          <p className="font-['Josefin_Sans'] font-extralight text-lg text-black">
            Scroll to explore
          </p>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative mx-auto max-w-[1440px] px-4 py-14 md:px-12 md:py-24">
        {/* Scrolling Image Stack with Fixated Header */}
        <ScrollImageStack
          images={[imgRectangle2, imgRectangle3, imgRectangle4]}
          title={
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:max-w-4xl"
            >
              <h2 className="font-['Italiana'] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-black md:pr-10">
                Curated wedding and event styling with a polished luxury touch.
              </h2>
            </motion.div>
          }
          description={
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:max-w-md lg:pl-2"
            >
              <p className="font-['Josefin_Sans'] font-extralight text-[18px] md:text-[20px] text-black leading-[1.85]">
                Weddwood Design creates elegant weddings, immersive event styling, and polished guest experiences that feel effortless, elevated, and unforgettable.
              </p>
            </motion.div>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-56 md:grid-cols-12 md:gap-y-24">
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
      <section id="services" className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-4 md:px-12 md:pb-24 md:pt-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative mx-auto max-w-[1440px] overflow-hidden px-4 py-16 md:px-12 md:py-24">
        <GalleryAndVideo images={[imgRectangle4, imgRectangle5, imgRectangle6, imgRectangle4, imgRectangle5, imgRectangle6]} />
      </section>

      {/* Testimonials Section */}
      <section className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-12 md:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Italiana'] text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-black max-w-2xl mb-12 md:mb-16"
        >
          Let's create an event experience that feels worth remembering.
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1 }}
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
