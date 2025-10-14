'use client';

import React, { useState, useRef, useEffect } from 'react';
import { askWithVoice } from '@/ai/flows/gemini-voice-agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Play, Mic, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function GeminiVoiceAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{ text: string; audio: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (response?.audio && audioRef.current) {
      audioRef.current.src = response.audio;
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const result = await askWithVoice({ query });
      setResponse(result);
    } catch (error) {
      console.error('Error getting response from voice agent:', error);
      setResponse({
        text: 'Lo siento, ha ocurrido un error al procesar tu solicitud.',
        audio: '',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-24 z-[1001] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-110 hover:bg-primary/90"
        title="Hablar con el asistente de voz"
      >
        <Mic className="h-8 w-8" />
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 right-5 z-[1000] w-full max-w-md"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Asistente de Voz</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    disabled={isLoading}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Preguntar'}
                  </Button>
                </form>

                {response && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Respuesta:</p>
                    <p className="mb-2">{response.text}</p>
                    {response.audio && (
                      <>
                        <Button onClick={playAudio} size="sm" variant="outline" disabled={isLoading}>
                          <Play className="mr-2" />
                          Reproducir Audio
                        </Button>
                        <audio ref={audioRef} src={response.audio} className="hidden" />
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
