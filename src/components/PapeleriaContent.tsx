import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function PapeleriaContent() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <ResponsiveImage
            name="section1-1"
            alt="Papelería para bodas - Lista de servicios"
            className="w-full h-auto block"
            priority
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
            name="section1-2"
            alt="Packs de papelería para bodas"
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
              ¿Te gustaría saber más?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Cuéntame cómo imaginas tu día y juntos diseñaremos la papelería perfecta para tu boda.
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
