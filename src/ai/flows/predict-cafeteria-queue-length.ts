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

Consider these factors when predicting queue length and waiting time:
* Time of day: Predict how busy the cafeteria will be during rush hour.
* Historical data: Take historical order data into account.
* Real-time order volume: Use the current order volume to estimate the queue length.

Provide your prediction in terms of the predicted queue length, the predicted waiting time (in minutes), and an analysis to help students decide when to go and avoid long waits. Be specific and precise with your reasoning and prediction, and base it off of the data provided.

Make sure the analysis explains whether the queue length and waiting time are (very short, short, moderate, long, very long).
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
