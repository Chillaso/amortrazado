import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function PapeleriaSection() {
  return (
    <section id="servicios" className="bg-white">
      <div className="relative overflow-hidden">
        <ResponsiveImage
          name="section1"
          alt="Vuestra historia, convertida en papel"
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="w-full sm:max-w-[45%] lg:max-w-[40%] bg-secondary backdrop-blur-sm px-6 py-8 sm:py-12 lg:px-10 lg:py-16 flex flex-col gap-4 sm:gap-5 min-h-[40%] sm:min-h-0 sm:min-w-[320px]">
            <h2 className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight drop-shadow-sm">
              Vuestra historia, convertida en papel
            </h2>
            <p className="text-white text-sm sm:text-base drop-shadow-sm">
              Papel, ilustración y emoción se unen para dar forma a detalles únicos.
            </p>
            <p className="text-white text-sm sm:text-base drop-shadow-sm">
              Diseños creados a medida para reflejar vuestra esencia y contar vuestra historia.
            </p>
            <motion.a
              href="/papeleria-bodas"
              className="mt-2 w-fit min-h-[32px] sm:min-h-[38px] inline-flex items-center gap-2 bg-rose-700 text-white font-medium text-xs sm:text-sm uppercase tracking-wide py-2 px-4 sm:py-3 sm:px-6 rounded-full"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              initial="rest"
              whileHover="hover"
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
        </div>
      </div>
    </section>
  );
}
