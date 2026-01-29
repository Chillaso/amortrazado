import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function ProductsSection() {
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
          name="section4"
          alt="Productos de papelería - Invitaciones, menús, seating plan"
          className="w-full h-auto block"
        />
      </motion.div>

      <div className="relative bottom-20 z-10 flex flex-col items-center justify-center px-4">
        <motion.a
          href="#servicios"
          className="group h-[40px] inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-medium uppercase tracking-wide border border-secondary-dark/50 hover:border-secondary-dark hover:bg-secondary-light"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <span>Quiero hacer un encargo</span>
        </motion.a>
      </div>
    </section>
  );
}
