'use client';

import { askAgata } from '@/ai/flows/agata-assistant-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader, PauseCircle, PlayCircle, Send, User, X } from 'lucide-react';
import React, { FormEvent, useRef, useState, useEffect } from 'react';

type Message = {
  role: 'user' | 'model';
  content: string;
  audio?: string;
};

export function AgataAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setActiveAudio(null);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [activeAudio]);

  const playAudio = (audioSrc: string) => {
    if (audioRef.current) {
      if (activeAudio === audioSrc && !audioRef.current.paused) {
        audioRef.current.pause();
      } else {
        if (activeAudio !== audioSrc) {
          setActiveAudio(audioSrc);
          audioRef.current.src = audioSrc;
        }
        audioRef.current.play().catch(console.error);
      }
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const { text, audio } = await askAgata({ question: input, history: messages });
      const modelMessage: Message = { role: 'model', content: text, audio };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error calling Agata assistant:', error);
      const errorMessage: Message = {
        role: 'model',
        content:
          'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo más tarde.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-md"
          >
            <Card className="flex h-[70vh] flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b bg-primary text-primary-foreground">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  <h3 className="font-semibold">Agata - Asistente BMG</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                  <div className="p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            'flex items-start gap-3',
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.role === 'model' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Bot size={20} />
                            </div>
                          )}
                          <div
                            className={cn(
                              'max-w-[80%] rounded-xl px-4 py-2 text-sm',
                              message.role === 'user'
                                ? 'bg-muted text-foreground'
                                : 'bg-primary/10 text-foreground'
                            )}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            {message.audio && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mt-2 h-7 w-7 text-primary"
                                onClick={() => playAudio(message.audio!)}
                              >
                                {activeAudio === message.audio && isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                              </Button>
                            )}
                          </div>
                           {message.role === 'user' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <User size={20} />
                            </div>
                          )}
                        </div>
                      ))}
                       {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot size={20} />
                          </div>
                          <div className="bg-primary/10 text-foreground max-w-[80%] rounded-xl px-4 py-3 text-sm flex items-center">
                            <Loader className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-2">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full bg-primary shadow-2xl transition-transform hover:scale-110"
          aria-label="Abrir chat de Agata"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
        </Button>
      </motion.div>
      <audio ref={audioRef} className="hidden" />
    </>
  );
}
