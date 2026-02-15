'use server';
/**
 * Growth characteristics
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlantGrowthInputSchema = z.object({
  plantJournal: z.string(),
});

export type PlantGrowthInput = z.infer<typeof PlantGrowthInputSchema>;

const PlantGrowthOutputSchema = z.object({
  answer: z.string(),
});

export type PlantGrowthOutput = z.infer<typeof PlantGrowthOutputSchema>;

const prompt = ai.definePrompt({
  name: 'plantGrowthPrompt',
  input: { schema: PlantGrowthInputSchema },
  output: { schema: PlantGrowthOutputSchema },
  prompt: `
Using the plant data:
{{plantJournal}}

Return growth info in ONE LINE:

📈 growth rate: <value>, 📏 height & spread: <value>, ⏳ lifespan: <value>, 🌼 flowering & fruiting season: <value>;
`,
});

const flow = ai.defineFlow(
  {
    name: 'plantGrowthFlow',
    inputSchema: PlantGrowthInputSchema,
    outputSchema: PlantGrowthOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    let text = output!.answer.replace(/\n+/g, ' ').trim();
    if (!text.endsWith(';')) text += ';';
    return { answer: text };
  }
);

export async function getPlantGrowthInfo(
  input: PlantGrowthInput
): Promise<PlantGrowthOutput> {
  return flow(input);
}
