"use server";

import { diagnosePlantHealthFromPhoto } from "@/ai/flows/diagnose-plant-health-from-photo";
import { z } from "zod";

const schema = z.object({
  photoDataUri: z.string().min(1, { message: "Image is required." }),
});

export type FormState = {
  message: string;
  data?: {
    diagnosis: string;
    cure: string;
  };
};

export async function diagnosePlantAction(
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
    const result = await diagnosePlantHealthFromPhoto(validatedFields.data);
    return {
      message: "success",
      data: result,
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return {
      message: `An error occurred during diagnosis: ${errorMessage}`,
    };
  }
}
