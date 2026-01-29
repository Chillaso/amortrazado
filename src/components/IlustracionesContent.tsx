import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function IlustracionesContent() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            name="section6-1"
            alt="Ilustraciones personalizadas"
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <ResponsiveImage
            name="section6-2"
            alt="Ilustración personalizada con alma"
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      <section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <ResponsiveImage
            name="section6-3"
            alt="Galería de ilustraciones personalizadas"
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mb-6">
              ¿Quieres una ilustración única?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Cada ilustración nace de una historia. Cuéntame la tuya y crearemos juntos un recuerdo para siempre.
            </p>
            <a
              href="/#contacto"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Contactar
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
