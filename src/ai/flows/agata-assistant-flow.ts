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
import wav from 'wav';
import {googleAI} from '@genkit-ai/google-genai';

const AskAgataInputSchema = z.object({
  question: z.string().describe("The user's question for Agata."),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The conversation history.'),
});

export type AskAgataInput = z.infer<typeof AskAgataInputSchema>;

const AskAgataOutputSchema = z.object({
  text: z.string().describe('The text response from Agata.'),
  audio: z.string().describe('The audio response from Agata as a data URI.'),
});

export type AskAgataOutput = z.infer<typeof AskAgataOutputSchema>;

export async function askAgata(input: AskAgataInput): Promise<AskAgataOutput> {
  return agataAssistantFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const agataAssistantFlow = ai.defineFlow(
  {
    name: 'agataAssistantFlow',
    inputSchema: AskAgataInputSchema,
    outputSchema: AskAgataOutputSchema,
  },
  async ({question, history}) => {
    const systemPrompt = `Eres Agata, el asistente virtual del proyecto BMG Colombia.
Tu misión es orientar a los visitantes y responder de manera clara, amable y profesional a todas las dudas sobre el proyecto.
Explica los objetivos, actividades, beneficios y formas de participación.
Si no tienes la información exacta, ofrece una respuesta útil o sugiere un canal oficial de contacto.
Mantén siempre un tono positivo, confiable y cercano.
Sé empático y útil en cada respuesta.

Debes:
- Formatear tus respuestas usando saltos de línea (\n) para separar párrafos y listas para que el texto sea claro y fácil de leer. NO uses Markdown ni asteriscos.
- Explicar el propósito, avances y objetivos del proyecto.
- Guiar a las personas en cómo participar, colaborar o acceder a beneficios.
- Resolver dudas comunes con lenguaje natural, cercano y profesional.
- Si una pregunta no tiene respuesta directa, ofrecer una respuesta informativa o una alternativa útil (por ejemplo, redirigir a un canal oficial o sugerir contacto).
- Evitar tecnicismos innecesarios y mantener siempre un tono positivo, empático y proactivo.

Estilo:
- Amable y entusiasta.
- Claro y explicativo.
- Orientado a guiar y resolver.`;

    const {text} = await ai.generate({
      prompt: question,
      history: [{role: 'system', content: systemPrompt}, ...(history || [])],
      config: {
        temperature: 0.7,
      },
    });

    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio was generated.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      text,
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
