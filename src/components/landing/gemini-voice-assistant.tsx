'use client';

import React, { useState, useRef, useEffect } from 'react';
import { askWithVoice, type ConversationInput } from '@/ai/flows/gemini-voice-agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Mic, X, Bot, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const initialMessage: Message = {
  role: 'model',
  content: 'Hola, soy el Asistente de Información de BMG. ¿En qué puedo ayudarte hoy?',
};

export function GeminiVoiceAssistant() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'es-ES';
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        stopListening();
        // Automatically submit the transcript
        handleSubmit(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setQuery('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = async (currentQuery: string) => {
    if (!currentQuery.trim()) return;

    setIsLoading(true);
    const newUserMessage: Message = { role: 'user', content: currentQuery };
    setHistory(prev => [...prev, newUserMessage]);
    setQuery('');

    try {
      const conversationInput: ConversationInput = {
        history: history,
        query: currentQuery,
      };
      const result = await askWithVoice(conversationInput);
      
      const newAssistantMessage: Message = { role: 'model', content: result.text };
      setHistory(prev => [...prev, newAssistantMessage]);

      if (audioRef.current && result.audio) {
        audioRef.current.src = result.audio;
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    } catch (error) {
      console.error('Error getting response from voice agent:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Lo siento, ha ocurrido un error al procesar tu solicitud.',
      };
      setHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(query);
  };
  
  const handleOpenChat = () => {
    setIsChatOpen(true);
    if (history.length === 0) {
      setHistory([initialMessage]);
    }
  }

  return (
    <>
      <button
        onClick={handleOpenChat}
        className="fixed bottom-4 right-24 z-[1001] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-110 hover:bg-primary/90"
        title="Asistente de Información"
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
            <Card className="flex h-[60vh] flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Asistente de Información</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                  <div className="space-y-4 pr-4">
                    {history.map((msg, index) => (
                      <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <Bot className="h-6 w-6 shrink-0 text-primary" />}
                        <div className={`rounded-lg px-3 py-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && <User className="h-6 w-6 shrink-0" />}
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                         <Bot className="h-6 w-6 shrink-0 text-primary" />
                         <div className="rounded-lg px-3 py-2 bg-muted">
                           <Loader2 className="h-5 w-5 animate-spin" />
                         </div>
                       </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleFormSubmit} className="flex w-full items-center gap-2">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={isListening ? "Escuchando..." : "Escribe o presiona el micrófono..."}
                    disabled={isLoading || isListening}
                    className="flex-grow"
                  />
                  <Button type="button" size="icon" variant={isListening ? "destructive" : "outline"} onClick={isListening ? stopListening : startListening} disabled={isLoading}>
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button type="submit" size="icon" disabled={isLoading || !query.trim()}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
            <audio ref={audioRef} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
