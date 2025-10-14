'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function AgataAssistant() {
  const [mostrarChat, setMostrarChat] = useState(false);

  useEffect(() => {
    if (mostrarChat) {
      const scriptId = 'elevenlabs-widget-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
        script.async = true;
        script.type = 'text/javascript';
        document.body.appendChild(script);
      }
    }
  }, [mostrarChat]);

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
            className="fixed bottom-24 right-5 z-[1000] rounded-2xl bg-white p-2.5 shadow-2xl"
          >
            <elevenlabs-convai></elevenlabs-convai>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
