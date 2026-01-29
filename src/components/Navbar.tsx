import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
  showBackButton?: boolean;
}

export default function Navbar({ showBackButton = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {showBackButton ? (
            <a
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Volver</span>
            </a>
          ) : (
            <a href="/" className="flex items-center">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-primary">
                Amor Trazado
              </span>
            </a>
          )}

          <div className="hidden md:flex items-center gap-8">
            <a href="/#servicios" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Servicios
            </a>
            <a href="/papeleria-bodas" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Papelería
            </a>
            <a href="/ilustraciones" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Ilustraciones
            </a>
            <a href="/#contacto" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium">
              Contacto
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="/#servicios" className="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
                Servicios
              </a>
              <a href="/papeleria-bodas" className="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
                Papelería
              </a>
              <a href="/ilustraciones" className="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
                Ilustraciones
              </a>
              <a href="/#contacto" className="block bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium text-center">
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
