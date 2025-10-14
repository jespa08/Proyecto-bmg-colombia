'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function AgataAssistant() {
  const [mostrarChat, setMostrarChat] = useState(false);

  return (
    <>
      <button
        onClick={() => setMostrarChat(!mostrarChat)}
        className="fixed bottom-4 right-4 z-[1001] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-purple-700"
        title="Hablar con el asistente BMG"
      >
        <span className="text-3xl">💬</span>
      </button>

      <AnimatePresence>
        {mostrarChat && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 right-5 z-[1000] w-80 rounded-2xl bg-white p-4 text-center shadow-2xl"
          >
            <h3 className="text-lg font-bold text-gray-800">Asistente Virtual</h3>
            <p className="mt-2 text-sm text-gray-600">
              Estamos configurando nuestro asistente. ¡Pronto estará disponible para ayudarte!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
