'use server';
/**
 * Similar & companion plants
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RelatedPlantsInputSchema = z.object({
  plantJournal: z.string(),
});

export type RelatedPlantsInput = z.infer<typeof RelatedPlantsInputSchema>;

const RelatedPlantsOutputSchema = z.object({
  answer: z.string(),
});

export type RelatedPlantsOutput = z.infer<typeof RelatedPlantsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'relatedPlantsPrompt',
  input: { schema: RelatedPlantsInputSchema },
  output: { schema: RelatedPlantsOutputSchema },
  prompt: `
Using this plant data:
{{plantJournal}}

Return related plant info in ONE LINE:

🌱 similar species: <value>, 🤝 companion plants: <value>, 🌼 variants or cultivars: <value>;
`,
});

const flow = ai.defineFlow(
  {
    name: 'relatedPlantsFlow',
    inputSchema: RelatedPlantsInputSchema,
    outputSchema: RelatedPlantsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    let text = output!.answer.replace(/\n+/g, ' ').trim();
    if (!text.endsWith(';')) text += ';';
    return { answer: text };
  }
);

export async function getRelatedPlants(
  input: RelatedPlantsInput
): Promise<RelatedPlantsOutput> {
  return flow(input);
}
