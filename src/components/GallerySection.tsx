import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function GallerySection() {
  return (
    <section className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <ResponsiveImage
          name="section2"
          alt="Galería de trabajos - Invitaciones, decoración y menús"
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  );
}
