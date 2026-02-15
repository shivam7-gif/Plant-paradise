'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const VisualizePlantInputSchema = z.object({
    roomPhotoDataUri: z.string().describe("Data URI of the room photo."),
    plantName: z.string().describe("Name of the plant to visualize."),
});

export type VisualizePlantInput = z.infer<typeof VisualizePlantInputSchema>;

const VisualizePlantOutputSchema = z.object({
    imageUrl: z.string().describe("Base64 or URL of the generated image."),
    status: z.enum(["success", "failed", "mock"]).describe("Status of generation."),
});

export type VisualizePlantOutput = z.infer<typeof VisualizePlantOutputSchema>;

// Define a flow for image generation
const visualizePlantFlow = ai.defineFlow(
    {
        name: "visualizePlantFlow",
        inputSchema: VisualizePlantInputSchema,
        outputSchema: VisualizePlantOutputSchema,
    },
    async (input): Promise<VisualizePlantOutput> => {
        try {
            // Attempt to generate using a model string. 
            // If "imagen-3" is not configured, this might throw, which is handled by catch.
            const response = await ai.generate({
                model: 'googleai/imagen-3.0-generate-001',
                prompt: `Generate a photorealistic image of a ${input.plantName} placed beautifully in a modern, well-lit room. High quality, interior design style.`,
                output: { format: "media" }
            });

            if (response && response.media) {
                return {
                    imageUrl: response.media.url,
                    status: "success"
                };
            }

            throw new Error("No image generated");

        } catch (error) {
            console.warn("Verify: Image generation failed (likely API access/quota), falling back to demo mode.", error);
            return {
                imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop",
                status: "mock"
            };
        }
    }
);

export async function visualizePlant(
    input: VisualizePlantInput
): Promise<VisualizePlantOutput> {
    return visualizePlantFlow(input);
}
