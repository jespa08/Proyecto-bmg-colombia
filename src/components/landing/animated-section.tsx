"use client";

import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { WaveAnimation } from "./wave-animation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  showNotes?: boolean;
  id?: string;
  showWaves?: boolean;
}

interface NoteStyle {
  left: string;
  top: string;
  scale: number;
  size: number;
  duration: number;
}

export function AnimatedSection({ children, className, showNotes = false, id, showWaves = false }: AnimatedSectionProps) {
  const [noteStyles, setNoteStyles] = useState<NoteStyle[]>([]);

  useEffect(() => {
    if (showNotes) {
      const styles: NoteStyle[] = Array.from({ length: 8 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        size: 30 + Math.random() * 40,
        duration: Math.random() * 2 + 3,
      }));
      setNoteStyles(styles);
    }
  }, [showNotes]);

  const noteVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: [20, -20],
      opacity: [0, 0.5, 0],
      transition: {
        delay: i * 0.2,
        duration: noteStyles[i]?.duration || 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    }),
  };

  return (
    <motion.section
      id={id}
      className={cn("relative w-full overflow-hidden", className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {showWaves && <WaveAnimation />}
      {showNotes && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {noteStyles.map((style, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20"
              style={{
                left: style.left,
                top: style.top,
                scale: style.scale,
              }}
              variants={noteVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <Music2 size={style.size} />
            </motion.div>
          ))}
        </div>
      )}
       <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}
