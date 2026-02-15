// 'use server';

// import {ai} from "@/ai/genkit";
// import {z} from "genkit";

// /* ------------------ INPUT SCHEMA ------------------ */
// const AnswerCareInputSchema = z.object({
//   question: z.string().describe("The care question to be answered."),
//   plantInfo: z.string().describe("Information about the plant for context."),
// });

// export type AnswerCareInput = z.infer<typeof AnswerCareInputSchema>;
// /* ------------------ OUTPUT SCHEMA ------------------ */
// const AnswerCareOutputSchema = z.object({
//   answer: z.string().describe("The answer to the care question."),
// })

// export type AnswerCareOutput = z.infer<typeof AnswerCareOutputSchema>;
// /* ------------------ PROMPT ------------------ */
// const prompt = ai.definePrompt({
//   name: "answerCarePrompt",
//   input: {schema: AnswerCareInputSchema},
//   output: {schema: AnswerCareOutputSchema},
//   prompt: `You are a helpful assistant that answers plant care questions.
