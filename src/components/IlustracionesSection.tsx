import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function IlustracionesSection() {
  return (
    <section className="bg-gray-50">
      <motion.a
        href="/ilustraciones"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="block group cursor-pointer w-full"
      >
        <div className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <ResponsiveImage
            name="section6"
            alt="Ilustraciones personalizadas"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.a>
    </section>
  );
}
