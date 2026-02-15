'use server';
/**
 * Interesting & cultural facts
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlantFactsInputSchema = z.object({
  plantJournal: z.string(),
});

export type PlantFactsInput = z.infer<typeof PlantFactsInputSchema>;

const PlantFactsOutputSchema = z.object({
  answer: z.string(),
});

export type PlantFactsOutput = z.infer<typeof PlantFactsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'plantFactsPrompt',
  input: { schema: PlantFactsInputSchema },
  output: { schema: PlantFactsOutputSchema },
  prompt: `
From the following plant info:
{{plantJournal}}

ONE LINE FACTS:

💡 fun facts: <value>, 🏺 cultural significance: <value>, ⚠️ rarity or conservation status: <value>;
`,
});

const flow = ai.defineFlow(
  {
    name: 'plantFactsFlow',
    inputSchema: PlantFactsInputSchema,
    outputSchema: PlantFactsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    let text = output!.answer.replace(/\n+/g, ' ').trim();
    if (!text.endsWith(';')) text += ';';
    return { answer: text };
  }
);

export async function getPlantFacts(
  input: PlantFactsInput
): Promise<PlantFactsOutput> {
  return flow(input);
}
