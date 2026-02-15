"use server";
/**
 * @fileOverview AI flow to recommend the best gardener based on user's garden information (seeds, plants, etc.)
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

/* ------------------ INPUT SCHEMA ------------------ */
const RecommendGardenerInputSchema = z.object({
  gardenInfo: z
    .string()
    .describe(
      "User-provided information about their garden, including seeds, plants, soil type, issues, etc."
    ),
  gardeners: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        rating: z.number(),
        reviews: z.number(),
        distance: z.number(),
        hourlyRate: z.number(),
        specialties: z.array(z.string()),
        available: z.boolean(),
        completedJobs: z.number(),
        verifiedBadge: z.boolean(),
      })
    )
    .describe("List of available gardeners with their details."),
});

export type RecommendGardenerInput = z.infer<
  typeof RecommendGardenerInputSchema
>;

/* ------------------ OUTPUT SCHEMA ------------------ */
const RecommendGardenerOutputSchema = z.object({
  recommendedGardener: z
    .object({
      id: z.number(),
      name: z.string(),
      reasoning: z
        .string()
        .describe(
          "Explanation of why this gardener is recommended, including specialty matches and pricing considerations."
        ),
      suggestedPrice: z
        .number()
        .describe(
          "Suggested total price based on estimated hours and gardener rate."
        ),
    })
    .describe("The recommended gardener with reasoning and pricing."),
});

export type RecommendGardenerOutput = z.infer<
  typeof RecommendGardenerOutputSchema
>;

const prompt = ai.definePrompt({
  name: "recommendGardenerPrompt",
  input: { schema: RecommendGardenerInputSchema },
  output: { schema: RecommendGardenerOutputSchema },
  prompt: `
You are an expert gardening consultant AI.

User's garden information:
{{gardenInfo}}

Available gardeners:
{{gardeners}}

Your task:
Select the SINGLE best gardener based on suitability, quality, availability, and cost-effectiveness.

Decision Criteria:
- Match gardener specialties with the plants, seeds, and tasks mentioned.
- Prefer higher ratings, verified profiles, and completed jobs.
- Ensure the gardener is available.
- Estimate a reasonable total price based on expected work duration (2–4 hours for basic care).

IMPORTANT OUTPUT FORMAT RULE:
The "reasoning" MUST be written in a professional, row-wise bullet format using the following structure exactly:

- **Garden Requirement:** Describe the user's garden size and needs.
- **Specialty Match:** Explain how the gardener’s specialties align with the garden tasks.
- **Maintenance Coverage:** Explain how the gardener can handle ongoing or additional work.
- **Quality & Trust Factors:** Mention rating, reviews, completed jobs, and verification.
- **Pricing Justification:** Explain why the cost is reasonable for the expected work.
- **Final Recommendation:** Conclude clearly why this gardener is the best choice.

Output ONLY:
- id
- name
- reasoning (in the above structured format)
- suggestedPrice (number only)

Do not recommend more than one gardener.
Do not use paragraphs — use bullet points only.
`
});


const recommendGardenerFlow = ai.defineFlow(
  {
    name: "recommendGardenerFlow",
    inputSchema: RecommendGardenerInputSchema,
    outputSchema: RecommendGardenerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function recommendGardener(
  input: RecommendGardenerInput
): Promise<RecommendGardenerOutput> {
  return recommendGardenerFlow(input);
}
