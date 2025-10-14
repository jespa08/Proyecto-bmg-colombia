'use server';
/**
 * @fileOverview A conversational voice agent that responds to text queries with generated audio, maintaining conversation history.
 *
 * - askWithVoice - A function that takes a conversation history and returns a text and audio response.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'zod';
import wav from 'wav';
import { Readable } from 'stream';

// Define the schema for a single message in the conversation
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Define the schema for the flow's input, which is a history of messages
const ConversationInputSchema = z.object({
  history: z.array(MessageSchema),
  query: z.string(),
});
export type ConversationInput = z.infer<typeof ConversationInputSchema>;

// Define the schema for the flow's output
const VoiceOutputSchema = z.object({
  text: z.string().describe('The text response from the AI.'),
  audio: z.string().describe('The base64 encoded WAV audio data.'),
});
export type VoiceOutput = z.infer<typeof VoiceOutputSchema>;

const systemPrompt = `Eres un asistente virtual de BMG Colombia. Tu propósito es proporcionar información clara y útil sobre la compañía y su proyecto en Colombia a los visitantes del sitio web. Utiliza únicamente la siguiente información para responder a las preguntas. Sé amable, profesional y conciso.

INFORMACIÓN DE CONTEXTO:

Sobre BMG:
BMG Rights Management (UK), fundada en 2008, es parte del grupo global Bertelsmann. Ofrece servicios de gestión de derechos de autor transparentes y eficientes. En 2024, BMG se expandió a Colombia para crear empleo remoto y fomentar el talento musical local.

Misión Corporativa:
1.  Gestión de derechos justa y transparente para que los creadores reciban los ingresos que merecen.
2.  Innovación y transformación digital para optimizar procesos como licencias y distribución de ingresos.
3.  Promoción de la música global y la integración cultural.
4.  Creación de oportunidades de empleo y emprendimiento sostenibles, especialmente en Colombia, a través de un modelo de trabajo remoto.
5.  Construir una "Nueva Compañía Musical" centrada en el servicio al creador, más justa y autónoma.

Proyecto en Colombia:
Apoya a artistas emergentes a través de una plataforma donde los usuarios escuchan canciones de 1 minuto. Las tareas son sencillas y generan ingresos. Se trabaja de lunes a sábado y los pagos son semanales por Nequi o Bancolombia.

Modelo de Ingresos:
Los ingresos de BMG provienen de tarifas de promoción pagadas por empresas publicitarias, discográficas y artistas. Los depósitos de los empleados son una garantía simbólica, no la fuente de ingresos de la empresa. Del 60% al 80% de los ingresos se distribuye como salario a los empleados según su nivel y contribución.

Niveles y Ganancias:
- Nivel A3: Inversión de $470.000, 6 tareas diarias, ganancias de $15.600 diarios, contrato por 2 años.
- Nivel B1: Inversión de $1.570.000, 12 tareas diarias, ganancias de $54.000 diarios, contrato por 3 años.
- Nivel B2: Inversión de $3.970.000, 24 tareas diarias, ganancias de $144.000 diarios, contrato por 3 años.
Los usuarios de nivel B retiran los jueves y los de nivel A los viernes.

Tarjeta de Crédito BMG:
Permite a los nuevos empleados (nivel A3 o B1 en adelante) retirar por adelantado el depósito laboral. El monto se puede reembolsar en cuotas sin interés con el salario generado. La aprobación tarda de 1 a 15 días hábiles.

Otras Oportunidades:
- Fondo Notas Doradas: BMG invierte en obras musicales, generando dividendos que se distribuyen entre los empleados.
- Opciones sobre Acciones BMG: Empleados a tiempo completo pueden acceder a planes de opciones sobre acciones, beneficiándose del crecimiento de la compañía.

Responsabilidad Social:
BMG apoya causas sociales como la asistencia a zonas vulnerables en Colombia, la educación musical en comunidades y la creación de empleo remoto inclusivo.

Lema:
"Música sin fronteras, amor sin límites."

Proceso de registro:
Los usuarios pueden registrarse a través del botón "Registrarme Ahora" en la página. Pueden probar como pasantes por 3 días. Para más información o para formalizar el empleo, deben contactar a jpanalystideasproductivas@gmail.com.
`;

/**
 * A flow that generates a text response based on conversation history and then converts it to speech.
 */
const voiceAgentFlow = ai.defineFlow(
  {
    name: 'voiceAgentFlow',
    inputSchema: ConversationInputSchema,
    outputSchema: VoiceOutputSchema,
  },
  async ({ history, query }) => {
    // 1. Generate a text response from the conversation history and the new query.
    const { text: textResponse } = await ai.generate({
      prompt: query,
      history: history.map(m => ({ role: m.role, content: [{ text: m.content }] })),
      system: systemPrompt,
    });

    // 2. Generate audio from the text response.
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: textResponse,
    });

    if (!media || !media.url) {
      throw new Error('Audio generation failed: no media returned.');
    }

    // 3. Convert the raw PCM audio data to WAV format.
    const pcmData = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(pcmData);

    // 4. Return both the text and the base64 encoded WAV audio.
    return {
      text: textResponse,
      audio: `data:audio/wav;base64,${wavData}`,
    };
  }
);

/**
 * Wrapper function to be called from the client-side.
 * @param input The conversation history and the new query.
 * @returns An object containing the text response and base64 audio data.
 */
export async function askWithVoice(input: ConversationInput): Promise<VoiceOutput> {
  return voiceAgentFlow(input);
}

/**
 * Converts raw PCM audio data into WAV format.
 * @param pcmData The raw PCM audio buffer.
 * @param channels Number of audio channels.
 * @param rate Sample rate.
 * @param sampleWidth Sample width in bytes.
 * @returns A promise that resolves with the base64 encoded WAV data.
 */
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

    const chunks: Buffer[] = [];
    writer.on('data', (chunk) => chunks.push(chunk));
    writer.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
    writer.on('error', reject);

    // Create a readable stream from the PCM data and pipe it to the WAV writer.
    const readable = new Readable();
    readable.push(pcmData);
    readable.push(null); // Signal end of stream
    readable.pipe(writer);
  });
}
