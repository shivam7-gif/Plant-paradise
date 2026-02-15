"use server";

import { answerPlantCareQuestion } from "@/ai/flows/answer-plant-care-questions";
import { journalEntries } from "@/lib/placeholder-data";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(1, { message: "Question is required." }),
});

export async function askQuestionAction(
  question: string
): Promise<{ answer: string } | { error: string }> {
  const validatedFields = schema.safeParse({ question });

  if (!validatedFields.success) {
    return {
      error: "Please enter a question.",
    };
  }

  // Create a mock plant journal string for context
  const plantJournal = journalEntries
    .map(
      (entry) =>
        `Plant: ${entry.name} (${entry.species}), Acquired: ${entry.dateAcquired}. Notes: ${entry.notes.join(" ")}`
    )
    .join("\n\n");

  try {
    const result = await answerPlantCareQuestion({
      question: validatedFields.data.question,
      plantJournal,
    });
    return {
      answer: result.answer,
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return {
      error: `An error occurred: ${errorMessage}`,
    };
  }
}
