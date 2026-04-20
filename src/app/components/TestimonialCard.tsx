import { motion } from 'motion/react';

interface TestimonialCardProps {
  quote: string;
  client: string;
}

export function TestimonialCard({ quote, client }: TestimonialCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[260px] flex-col items-center gap-5 overflow-hidden rounded-t-[20px] bg-white px-10 pb-7 pt-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d8c29a]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#d8c29a] via-[#d8c29a]/65 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-[#d8c29a] via-[#d8c29a]/65 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 rounded-tl-[20px] border-l border-t border-[#d8c29a]" />
      <div className="pointer-events-none absolute right-0 top-0 h-5 w-5 rounded-tr-[20px] border-r border-t border-[#d8c29a]" />
      <div className="rotate-180">
        <svg className="size-6" fill="none" viewBox="0 0 23 23">
          <path
            d="M10.0625 11.5H5.75C4.95937 11.5 4.3125 10.8531 4.3125 10.0625V5.75C4.3125 4.95937 4.95937 4.3125 5.75 4.3125H10.0625C10.8531 4.3125 11.5 4.95937 11.5 5.75V10.0625C11.5 10.8531 10.8531 11.5 10.0625 11.5ZM18.6875 11.5H14.375C13.5844 11.5 12.9375 10.8531 12.9375 10.0625V5.75C12.9375 4.95937 13.5844 4.3125 14.375 4.3125H18.6875C19.4781 4.3125 20.125 4.95937 20.125 5.75V10.0625C20.125 10.8531 19.4781 11.5 18.6875 11.5Z"
            fill="#C8AE75"
          />
          <path
            d="M7.90625 17.25C9.34375 15.8125 10.0625 13.6562 10.0625 11.5V8.625M16.5312 17.25C17.9688 15.8125 18.6875 13.6562 18.6875 11.5V8.625"
            stroke="#C8AE75"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="max-w-[270px] text-center font-['Josefin_Sans'] font-extralight text-[18px] text-black leading-[1.7] md:text-[19px]">
        {quote}
      </p>
      <p className="pt-2 text-center font-['Josefin_Sans'] font-extralight text-[18px] text-black md:text-[19px]">
        {client}
      </p>
    </motion.div>
  );
}
