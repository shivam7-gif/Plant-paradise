'use server';
/**
 * @fileOverview Analyzes a plant photo for potential health issues and provides diagnosis and cure.
 *
 * - diagnosePlantHealthFromPhoto - A function that handles the plant health diagnosis process from a photo.
 * - DiagnosePlantHealthFromPhotoInput - The input type for the diagnosePlantHealthFromPhoto function.
 * - DiagnosePlantHealthFromPhotoOutput - The return type for the diagnosePlantHealthFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantHealthFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'." // Corrected the escaping of the single quotes
    ),
});
export type DiagnosePlantHealthFromPhotoInput = z.infer<
  typeof DiagnosePlantHealthFromPhotoInputSchema
>;

const DiagnosePlantHealthFromPhotoOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the plant health.'),
  cure: z.string().describe('The recommended cure or treatment for the diagnosed issue.'),
});
export type DiagnosePlantHealthFromPhotoOutput = z.infer<
  typeof DiagnosePlantHealthFromPhotoOutputSchema
>;

export async function diagnosePlantHealthFromPhoto(
  input: DiagnosePlantHealthFromPhotoInput
): Promise<DiagnosePlantHealthFromPhotoOutput> {
  return diagnosePlantHealthFromPhotoFlow(input);
}

const diagnosePlantHealthFromPhotoPrompt = ai.definePrompt({
  name: 'diagnosePlantHealthFromPhotoPrompt',
  input: {schema: DiagnosePlantHealthFromPhotoInputSchema},
  output: {schema: DiagnosePlantHealthFromPhotoOutputSchema},
  prompt: `You are an expert in plant health. Analyze the provided image of the plant and provide a diagnosis and a recommended cure. Consider potential issues such as overwatering, underwatering, nutrient deficiencies, or diseases.\n\nPlant Photo: {{media url=photoDataUri}}`,
});

const diagnosePlantHealthFromPhotoFlow = ai.defineFlow(
  {
    name: 'diagnosePlantHealthFromPhotoFlow',
    inputSchema: DiagnosePlantHealthFromPhotoInputSchema,
    outputSchema: DiagnosePlantHealthFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await diagnosePlantHealthFromPhotoPrompt(input);
    return output!;
  }
);
