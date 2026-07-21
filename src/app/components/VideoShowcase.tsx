import { useRef } from 'react';
import { motion } from 'motion/react';
import matthiasAubreyVideo from '../../assets/video/aubrey & Mathias/matthias-aubrey.mp4';
import matthiasAubreyPoster from '../../assets/video/aubrey & Mathias/matthias-aubrey-poster.webp';
import emmanuelPhelidiaVideo from '../../assets/video/emmanual & phelidia/emmanuel-phelidia.mp4';
import emmanuelPhelidiaPoster from '../../assets/video/emmanual & phelidia/emmanuel-phelidia-poster.webp';
import xianSanVideo from '../../assets/video/xian san/xian-san.mp4';
import xianSanPoster from '../../assets/video/xian san/xian-san-poster.webp';

const weddingFilms = [
  { title: 'Matthias & Aubrey', video: matthiasAubreyVideo, poster: matthiasAubreyPoster },
  { title: 'Emmanuel & Phelidia', video: emmanuelPhelidiaVideo, poster: emmanuelPhelidiaPoster },
  { title: 'Xian & San', video: xianSanVideo, poster: xianSanPoster },
];

export function VideoShowcase() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const pauseOtherFilms = (activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== activeIndex && video && !video.paused) video.pause();
    });
  };

  return (
    <section aria-labelledby="wedding-films-title" className="bg-[#f8f4ed] py-16 md:py-24">
      <div className="mx-auto max-w-[1680px] px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-16"
        >

          <h2 id="wedding-films-title" className="font-['Josefin_Sans'] text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1.05] text-[#181713]">
            Stories, held in motion.
          </h2>

        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {weddingFilms.map((film, index) => (
            <motion.article
              key={film.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-[480px] md:max-w-none"
            >
              <div className="border border-[#d8c9b2] bg-[#fffdf9] p-2 shadow-[0_24px_60px_rgba(69,52,28,0.09)] md:p-3">
                <video
                  ref={(element) => { videoRefs.current[index] = element; }}
                  controls
                  playsInline
                  preload="none"
                  poster={film.poster}
                  width="720"
                  height="1280"
                  onPlay={() => pauseOtherFilms(index)}
                  aria-label={film.title + ' wedding film'}
                  className="aspect-[9/16] w-full bg-[#171512] object-cover"
                >
                  <source src={film.video} type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
              <div className="px-1 pt-5 text-center">
                <h3 className="font-['Josefin_Sans'] text-[clamp(1.35rem,2vw,1.75rem)] font-light leading-tight text-[#181713]">
                  {film.title}
                </h3>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}