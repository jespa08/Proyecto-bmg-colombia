'use client';

import React, { useState, useRef, useEffect } from 'react';
import { askWithVoice } from '@/ai/flows/gemini-voice-agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Play } from 'lucide-react';

export function GeminiVoiceAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{ text: string; audio: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Asistente de Voz (Prueba)</CardTitle>
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
  );
}
