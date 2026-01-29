import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveImage
          name="header"
          alt="Amor Trazado - Papelería de boda e ilustraciones"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center px-4">
        <motion.a
          href="#servicios"
          className="group inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-medium uppercase tracking-wide border border-secondary-dark/50 hover:border-secondary-dark hover:bg-secondary-light"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <span>Conocer más</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
