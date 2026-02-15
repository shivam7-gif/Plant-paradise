'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AnalyzeRoomPlacementInputSchema = z.object({
    roomPhotoDataUri: z.string().describe("Data URI of the room photo."),
    plantName: z.string().describe("Name of the plant to check suitability for."),
    plantLightNeeds: z.string().describe("The light requirements of the plant."),
});

export type AnalyzeRoomPlacementInput = z.infer<
    typeof AnalyzeRoomPlacementInputSchema
>;

const AnalyzeRoomPlacementOutputSchema = z.object({
    lightingCondition: z.string().describe("Detected lighting (e.g., Low, Medium, Bright Direct, Bright Indirect)."),
    suitabilityScore: z.number().describe("0-100 score of how well the room fits the plant."),
    verdict: z.string().describe("Short verdict (e.g., Perfect Match, Too Dark)."),
    advice: z.string().describe("Specific advice for placement in this room."),
});

export type AnalyzeRoomPlacementOutput = z.infer<
    typeof AnalyzeRoomPlacementOutputSchema
>;

const analyzeRoomPlacementPrompt = ai.definePrompt({
    name: "analyzeRoomPlacementPrompt",
    input: { schema: AnalyzeRoomPlacementInputSchema },
    output: { schema: AnalyzeRoomPlacementOutputSchema },
    prompt: `
  You are an expert interior plant stylist and botanist.
  
  Analyze the provided room photo to determine if it is a good spot for a "{{plantName}}".
  The plant needs: {{plantLightNeeds}}.

  1. Analyze the lighting in the photo (window size, direction, brightness).
  2. Compare it with the plant's needs.
  3. Provide a suitability score (0-100) and specific advice.

  Room Photo: {{media url=roomPhotoDataUri}}
  `,
});

const analyzeRoomPlacementFlow = ai.defineFlow(
    {
        name: "analyzeRoomPlacementFlow",
        inputSchema: AnalyzeRoomPlacementInputSchema,
        outputSchema: AnalyzeRoomPlacementOutputSchema,
    },
    async (input) => {
        const { output } = await analyzeRoomPlacementPrompt(input);
        return output!;
    }
);

export async function analyzeRoomPlacement(
    input: AnalyzeRoomPlacementInput
): Promise<AnalyzeRoomPlacementOutput> {
    return analyzeRoomPlacementFlow(input);
}
