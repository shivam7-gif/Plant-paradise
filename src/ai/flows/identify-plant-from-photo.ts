'use server';
/**
 * @fileOverview Identifies a plant from a photo and provides information about it.
 *
 * - identifyPlantFromPhoto - A function that takes a photo of a plant and returns its name, description, and care information.
 * - IdentifyPlantFromPhotoInput - The input type for the identifyPlantFromPhoto function.
 * - IdentifyPlantFromPhotoOutput - The return type for the identifyPlantFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPlantFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyPlantFromPhotoInput = z.infer<typeof IdentifyPlantFromPhotoInputSchema>;

const IdentifyPlantFromPhotoOutputSchema = z.object({
  name: z.string().describe('The common name of the plant.'),
  latinName: z.string().describe('The Latin name of the plant.'),
  description: z.string().describe('A description of the plant.'),
  careInformation: z.string().describe('Information on how to care for the plant.'),
});
export type IdentifyPlantFromPhotoOutput = z.infer<typeof IdentifyPlantFromPhotoOutputSchema>;

export async function identifyPlantFromPhoto(
  input: IdentifyPlantFromPhotoInput
): Promise<IdentifyPlantFromPhotoOutput> {
  return identifyPlantFromPhotoFlow(input);
}

const identifyPlantFromPhotoPrompt = ai.definePrompt({
  name: 'identifyPlantFromPhotoPrompt',
  input: {schema: IdentifyPlantFromPhotoInputSchema},
  output: {schema: IdentifyPlantFromPhotoOutputSchema},
  prompt: `You are a botantist who specializes in identifying plants from photos.  Given the photo, identify the plant, give a short description of it, and provide care information.

Photo: {{media url=photoDataUri}}`,
});

const identifyPlantFromPhotoFlow = ai.defineFlow(
  {
    name: 'identifyPlantFromPhotoFlow',
    inputSchema: IdentifyPlantFromPhotoInputSchema,
    outputSchema: IdentifyPlantFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await identifyPlantFromPhotoPrompt(input);
    return output!;
  }
);
