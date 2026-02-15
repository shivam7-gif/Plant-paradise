'use server';
/**
 * @fileOverview AI service that provides plant uses
 * (edible, medicinal, ornamental, environmental).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ------------------ INPUT SCHEMA ------------------ */
const PlantUsesInputSchema = z.object({
  plantName: z.string().describe('Common or scientific name of the plant.'),
  plantJournal: z.string().describe(
    'Plant identification or journal data for accuracy.'
  ),
});

export type PlantUsesInput = z.infer<typeof PlantUsesInputSchema>;

/* ------------------ OUTPUT SCHEMA ------------------ */
const PlantUsesOutputSchema = z.object({
  answer: z.string().describe(
    'Plant uses returned in a single-row emoji-based format.'
  ),
});

export type PlantUsesOutput = z.infer<typeof PlantUsesOutputSchema>;

/* ------------------ PROMPT ------------------ */
const prompt = ai.definePrompt({
  name: 'plantUsesPrompt',
  input: { schema: PlantUsesInputSchema },
  output: { schema: PlantUsesOutputSchema },
  prompt: `
You are an expert botanist AI.

Use the following plant information:
{{plantJournal}}

Provide the uses of the plant "{{plantName}}".

⚠️ STRICT RULES:
- Respond in ONE SINGLE LINE
- Use emojis before each category
- Separate sections with commas
- End with a semicolon (;)
- No new lines
- No explanations

Return output in EXACTLY this format:

🍽️ edible uses: <value or "not edible">, 💊 medicinal uses: <value or "none">, 🌸 ornamental uses: <value>, 🌍 environmental benefits: <value>;
`,
});

/* ------------------ FLOW ------------------ */
const plantUsesFlow = ai.defineFlow(
  {
    name: 'plantUsesFlow',
    inputSchema: PlantUsesInputSchema,
    outputSchema: PlantUsesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    let answerText = output!.answer;

    // Normalize output
    answerText = answerText
      .replace(/\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Ensure semicolon
    if (!answerText.endsWith(';')) {
      answerText += ';';
    }

    return { answer: answerText };
  }
);

/* ------------------ EXPORT FUNCTION ------------------ */
export async function getPlantUses(
  input: PlantUsesInput
): Promise<PlantUsesOutput> {
  return plantUsesFlow(input);
}
