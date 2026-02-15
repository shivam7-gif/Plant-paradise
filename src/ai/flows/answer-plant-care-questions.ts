'use server';

/**
 * @fileOverview An AI chatbot that answers plant care questions based on journal information.
 *
 * - answerPlantCareQuestion - A function that handles answering plant care questions.
 * - AnswerPlantCareQuestionInput - The input type for the answerPlantCareQuestion function.
 * - AnswerPlantCareQuestionOutput - The return type for the answerPlantCareQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerPlantCareQuestionInputSchema = z.object({
  question: z.string().describe('The plant care question to answer.'),
  plantJournal: z.string().describe('The plant journal information for personalized advice.'),
});
export type AnswerPlantCareQuestionInput = z.infer<typeof AnswerPlantCareQuestionInputSchema>;

const AnswerPlantCareQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the plant care question.'),
});
export type AnswerPlantCareQuestionOutput = z.infer<typeof AnswerPlantCareQuestionOutputSchema>;

export async function answerPlantCareQuestion(input: AnswerPlantCareQuestionInput): Promise<AnswerPlantCareQuestionOutput> {
  return answerPlantCareQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerPlantCareQuestionPrompt',
  input: {schema: AnswerPlantCareQuestionInputSchema},
  output: {schema: AnswerPlantCareQuestionOutputSchema},
  prompt: `You are a helpful AI chatbot that answers plant care questions.

  Use the following plant journal information to give personalized advice:
  {{plantJournal}}

  Answer the following question:
  {{question}}`,
});

const answerPlantCareQuestionFlow = ai.defineFlow(
  {
    name: 'answerPlantCareQuestionFlow',
    inputSchema: AnswerPlantCareQuestionInputSchema,
    outputSchema: AnswerPlantCareQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
