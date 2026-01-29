import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function QuoteSection() {
  return (
    <section className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <ResponsiveImage
          name="section5"
          alt="Historias que se dibujan con amor"
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  );
}
