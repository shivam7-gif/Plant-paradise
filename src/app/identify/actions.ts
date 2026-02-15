"use server";

import { identifyPlantFromPhoto } from "@/ai/flows/identify-plant-from-photo";
import { z } from "zod";

const schema = z.object({
  photoDataUri: z.string().min(1, { message: "Image is required." }),
});

export type FormState = {
  message: string;
  data?: {
    name: string;
    latinName: string;
    description: string;
    careInformation: string;
  };
};

export async function identifyPlantAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please upload an image.",
    };
  }

  try {
    const result = await identifyPlantFromPhoto(validatedFields.data);
    return {
      message: "success",
      data: result,
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return {
      message: `An error occurred during identification: ${errorMessage}`,
    };
  }
}
