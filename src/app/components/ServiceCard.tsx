import { motion } from 'motion/react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[360px] space-y-4"
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="h-11 w-11 object-contain opacity-75"
      />
      <h3 className="font-['Josefin_Sans'] font-light text-[22px] text-black">
        {title}
      </h3>
      <p className="font-['Josefin_Sans'] font-extralight text-[16px] md:text-[18px] text-black leading-[1.95]">
        {description}
      </p>
    </motion.div>
  );
}
