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
      prompt: `You are a helpful assistant. Respond to the following query in a concise and friendly manner, keeping in mind the previous conversation.`,
      history: history.map(m => ({ role: m.role, content: [{ text: m.content }] })),
      messages: [{ role: 'user', content: [{ text: query }] }],
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
