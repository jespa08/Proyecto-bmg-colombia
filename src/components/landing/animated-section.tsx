"use client";

import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  showNotes?: boolean;
  id?: string;
}

export function AnimatedSection({ children, className, showNotes = false, id }: AnimatedSectionProps) {
  const noteVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: [20, -20],
      opacity: [0, 0.5, 0],
      transition: {
        delay: i * 0.2,
        duration: Math.random() * 2 + 3,
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
      {showNotes && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              variants={noteVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <Music2 size={30 + Math.random() * 40} />
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
