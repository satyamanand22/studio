'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending cafeteria times based on user historical behavior.
 *
 * It exports:
 * - `recommendCafeteriaTimes`: The main function to get cafeteria time recommendations.
 * - `RecommendCafeteriaTimesInput`: The input type for the function.
 * - `RecommendCafeteriaTimesOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCafeteriaTimesInputSchema = z.object({
  userHistoricalData: z
    .string()
    .describe(
      'Historical cafeteria visit data for the user, including timestamps and duration.'
    ),
  currentTime: z.string().describe('The current time.'),
});

export type RecommendCafeteriaTimesInput = z.infer<
  typeof RecommendCafeteriaTimesInputSchema
>;

const RecommendCafeteriaTimesOutputSchema = z.object({
  recommendedTimes: z
    .string()
    .describe(
      'Recommended cafeteria visit times based on historical data and current time.'
    ),
  reasoning: z
    .string()
    .describe('Explanation of why these times are recommended.'),
});

export type RecommendCafeteriaTimesOutput = z.infer<
  typeof RecommendCafeteriaTimesOutputSchema
>;

export async function recommendCafeteriaTimes(
  input: RecommendCafeteriaTimesInput
): Promise<RecommendCafeteriaTimesOutput> {
  return recommendCafeteriaTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCafeteriaTimesPrompt',
  input: {schema: RecommendCafeteriaTimesInputSchema},
  output: {schema: RecommendCafeteriaTimesOutputSchema},
  prompt: `You are an AI assistant specializing in recommending optimal cafeteria visit times for students.

  Based on the user's historical cafeteria visit data and the current time, recommend specific times when the cafeteria is likely to be less crowded.
  Explain the reasoning behind your recommendations.

  Historical Data: {{{userHistoricalData}}}
  Current Time: {{{currentTime}}}

  Consider factors such as meal times, class schedules, and previous visit patterns to provide personalized and actionable recommendations.
  Provide specific times, not time ranges.
`,
});

const recommendCafeteriaTimesFlow = ai.defineFlow(
  {
    name: 'recommendCafeteriaTimesFlow',
    inputSchema: RecommendCafeteriaTimesInputSchema,
    outputSchema: RecommendCafeteriaTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
