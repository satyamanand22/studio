'use server';
/**
 * @fileOverview Predicts cafeteria queue length and waiting time based on historical data and real-time conditions.
 *
 * - predictCafeteriaQueueLength - A function that predicts cafeteria queue length and waiting time.
 * - PredictCafeteriaQueueLengthInput - The input type for the predictCafeteriaQueueLength function.
 * - PredictCafeteriaQueueLengthOutput - The return type for the predictCafeteriaQueueLength function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCafeteriaQueueLengthInputSchema = z.object({
  currentTime: z.string().describe('The current time in ISO format.'),
  historicalOrderData: z.string().describe('Historical order data as a JSON string.'),
  realTimeOrderVolume: z.number().describe('The current real-time order volume.'),
});
export type PredictCafeteriaQueueLengthInput = z.infer<typeof PredictCafeteriaQueueLengthInputSchema>;

const PredictCafeteriaQueueLengthOutputSchema = z.object({
  queueLength: z.number().describe('The predicted queue length.'),
  waitingTime: z.number().describe('The predicted waiting time in minutes.'),
  analysis: z.string().describe('Qualitative analysis of the queue length and waiting time (e.g. very short, short, moderate, long, very long).'),
});
export type PredictCafeteriaQueueLengthOutput = z.infer<typeof PredictCafeteriaQueueLengthOutputSchema>;

export async function predictCafeteriaQueueLength(input: PredictCafeteriaQueueLengthInput): Promise<PredictCafeteriaQueueLengthOutput> {
  return predictCafeteriaQueueLengthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCafeteriaQueueLengthPrompt',
  input: {schema: PredictCafeteriaQueueLengthInputSchema},
  output: {schema: PredictCafeteriaQueueLengthOutputSchema},
  prompt: `You are a cafeteria queue prediction expert. Based on the current time, historical order data, and real-time order volume, predict the queue length and waiting time.

Current Time: {{{currentTime}}}
Historical Order Data: {{{historicalOrderData}}}
Real-time Order Volume: {{{realTimeOrderVolume}}}

Your task is to:
1.  Predict the number of people in the queue ('queueLength') based on the provided real-time and historical data.
2.  Calculate the estimated waiting time ('waitingTime') based on your predicted queue length. **The estimated time is exactly 3 minutes per person in the queue.**
3.  Provide a qualitative analysis of the queue length and waiting time (e.g., "very short," "short," "moderate," "long," "very long").

Provide your prediction in the specified output format. Be precise with your reasoning and base your predictions on the data provided.
`,
});

const predictCafeteriaQueueLengthFlow = ai.defineFlow(
  {
    name: 'predictCafeteriaQueueLengthFlow',
    inputSchema: PredictCafeteriaQueueLengthInputSchema,
    outputSchema: PredictCafeteriaQueueLengthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
