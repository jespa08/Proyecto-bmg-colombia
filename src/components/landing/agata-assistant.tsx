'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function AgataAssistant() {
  const [mostrarChat, setMostrarChat] = useState(false);

  return (
    <>
      <button
        onClick={() => setMostrarChat(!mostrarChat)}
        className="fixed bottom-4 right-4 z-[1001] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-2xl transition-transform hover:scale-110"
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
            <iframe
              src="https://elevenlabs.io/app/talk-to?agent_id=agent_4201k7hxveqgf0zbet4c8zd1sn8a"
              width="400"
              height="550"
              className="rounded-xl border-none"
              title="Asistente Virtual BMG"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
