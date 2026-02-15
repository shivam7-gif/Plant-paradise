"use server";

import { answerPlantCareQuestion } from "@/ai/flows/answer-plant-care-questions";
import { journalEntries } from "@/lib/placeholder-data";
import { z } from "zod";

// Define the state type for the chat
export type ChatState = {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
};

const schema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

export async function sendMessageAction(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  console.log("sendMessageAction triggered");
  const input = formData.get("message");
  const validatedFields = schema.safeParse({ message: input });

  if (!validatedFields.success) {
    return {
      messages: [
        ...prevState.messages,
        { role: "assistant", content: "Please enter a valid message." },
      ],
    };
  }

  const userMessage = validatedFields.data.message;

  // Optimistically return state? No, server actions return the new state.
  // We'll append the user message to the history we send to the AI, 
  // but for now the AI function `answerPlantCareQuestion` seems to take just a question and context.

  // Create a mock plant journal string for context
  const plantJournal = journalEntries
    .map(
      (entry) =>
        `Plant: ${entry.name} (${entry.species}), Acquired: ${entry.dateAcquired}. Notes: ${entry.notes.join(" ")}`
    )
    .join("\n\n");

  try {
    // Call the AI
    // Note: In a real app, we might pass the whole conversation history here.
    // For this existing function signature, we'll just pass the current question.
    const result = await answerPlantCareQuestion({
      question: userMessage,
      plantJournal,
    });

    return {
      messages: [
        ...prevState.messages,
        { role: "user", content: userMessage },
        { role: "assistant", content: result.answer || "I couldn't find an answer to that." },
      ],
    };
  } catch (e) {
    console.error(e);
    return {
      messages: [
        ...prevState.messages,
        { role: "user", content: userMessage },
        { role: "assistant", content: "Sorry, I encountered an error processing your request." },
      ],
    };
  }
}

// Keep the old action just in case, or remove if unused. 
// User's error was about sendMessageAction missing, so adding that is the priority.
export async function askQuestionAction(question: string) {
  // ... legacy implementation if needed, but likely unused now
  return { error: "Use sendMessageAction instead" };
}
