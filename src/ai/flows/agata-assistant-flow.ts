'use server';
/**
 * @fileOverview Agata, the virtual assistant for the BMG Colombia project.
 *
 * - askAgata - A function that handles user queries.
 * - AskAgataInput - The input type for the askAgata function.
 * - AskAgataOutput - The return type for the askAgata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAgataInputSchema = z.object({
  question: z.string().describe('The user\'s question for Agata.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});

export type AskAgataInput = z.infer<typeof AskAgataInputSchema>;

export type AskAgataOutput = string;

export async function askAgata(input: AskAgataInput): Promise<AskAgataOutput> {
  return agataAssistantFlow(input);
}

const agataAssistantFlow = ai.defineFlow(
  {
    name: 'agataAssistantFlow',
    inputSchema: AskAgataInputSchema,
    outputSchema: z.string(),
  },
  async ({question, history}) => {

    const systemPrompt = `Eres Agata, el asistente virtual del proyecto BMG Colombia.
Tu misión es orientar a los visitantes y responder de manera clara, amable y profesional a todas las dudas sobre el proyecto.
Explica los objetivos, actividades, beneficios y formas de participación.
Si no tienes la información exacta, ofrece una respuesta útil o sugiere un canal oficial de contacto.
Mantén siempre un tono positivo, confiable y cercano.
Evita respuestas técnicas o frías.
Sé breve, empático y útil en cada respuesta

Debes:
- Explicar el propósito, avances y objetivos del proyecto.
- Guiar a las personas en cómo participar, colaborar o acceder a beneficios.
- Resolver dudas comunes con lenguaje natural, cercano y profesional.
- Si una pregunta no tiene respuesta directa, ofrecer una respuesta informativa o una alternativa útil (por ejemplo, redirigir a un canal oficial o sugerir contacto).
- Evitar tecnicismos innecesarios y mantener siempre un tono positivo, empático y proactivo.

Estilo:
✨ Amable y entusiasta
💡 Claro y explicativo
🧭 Orientado a guiar y resolver`;
    
    const {text} = await ai.generate({
      prompt: question,
      history: [
        { role: 'system', content: systemPrompt },
        ...(history || []),
      ],
      config: {
        temperature: 0.7,
      }
    });

    return text;
  }
);
