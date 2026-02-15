'use server';
/**
 * @fileOverview An AI chatbot that answers complete plant information
 * (care, uses, growth, facts, related plants, etc.) based on journal data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ------------------ INPUT SCHEMA ------------------ */
const AnswerPlantCareQuestionInputSchema = z.object({
  question: z.string().describe(
    'Ask anything about the plant. The AI should return COMPLETE plant details including care, uses, growth, media guidance, facts, related plants, and interaction tips.'
  ),
  plantJournal: z.string().describe(
    'Full plant journal / identification data used for accurate answers.'
  ),
});

export type AnswerPlantCareQuestionInput = z.infer<
  typeof AnswerPlantCareQuestionInputSchema
>;

/* ------------------ OUTPUT SCHEMA ------------------ */
const AnswerPlantCareQuestionOutputSchema = z.object({
  answer: z.string().describe(
    'Complete plant details returned in a single-row emoji-based format.'
  ),
});

export type AnswerPlantCareQuestionOutput = z.infer<
  typeof AnswerPlantCareQuestionOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'answerPlantCareQuestionPrompt',
  input: { schema: AnswerPlantCareQuestionInputSchema },
  output: { schema: AnswerPlantCareQuestionOutputSchema },
  prompt: `
You are an expert botanist AI.

Use the following plant journal information:
{{plantJournal}}

Answer the user query:
{{question}}

⚠️ STRICT RULES:
- Respond in ONE SINGLE LINE
- Use emojis before each category
- Separate sections with commas
- End with a semicolon (;)
- Do NOT add new lines or explanations

Return ALL plant information using EXACTLY this format:

☀️ sunlight: <value>, 💧 watering: <value>, 🪴 soil & pH: <value>, 🌱 fertilization: <value>, 🌡️ temperature & humidity: <value>, ✂️ pruning & maintenance: <value>, 🐛 pests & diseases: <value>, 🌿 propagation: <value>,
🍽️ edible uses: <value>, 💊 medicinal uses: <value>, 🌸 ornamental uses: <value>, 🌍 environmental benefits: <value>,
📈 growth rate: <value>, 📏 height & spread: <value>, ⏳ lifespan: <value>, 🌼 flowering & fruiting season: <value>,
🖼️ media guidance: <value>, 🔍 visual identification tips: <value>,
💡 interesting facts: <value>, 🏺 cultural or historical significance: <value>, ⚠️ rarity or conservation status: <value>,
🌱 similar plants: <value>, 🤝 companion plants: <value>, 🌼 variants or cultivars: <value>,
💬 gardener interaction tips: <value>, ⏰ care reminders: <value>;
`,
});

const answerPlantCareQuestionFlow = ai.defineFlow(
  {
    name: 'answerPlantCareQuestionFlow',
    inputSchema: AnswerPlantCareQuestionInputSchema,
    outputSchema: AnswerPlantCareQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    let answerText = output!.answer;

    answerText = answerText
      .replace(/\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Ensure semicolon at end
    if (!answerText.endsWith(';')) {
      answerText += ';';
    }

    return { answer: answerText };
  }
);

export async function answerPlantCareQuestion(
  input: AnswerPlantCareQuestionInput
): Promise<AnswerPlantCareQuestionOutput> {
  return answerPlantCareQuestionFlow(input);
}
