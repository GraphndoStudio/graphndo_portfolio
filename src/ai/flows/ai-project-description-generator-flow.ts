'use server';
/**
 * @fileOverview A Genkit flow for generating concise and compelling project descriptions for a portfolio.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - ProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - ProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectType: z
    .string()
    .describe('The type of the project (e.g., Web Application, AI/ML Project, Design Concept).'),
  technologiesUsed: z.array(z.string()).describe('A list of technologies and tools used in the project.'),
  keyFeatures: z.array(z.string()).describe('A list of key features or functionalities of the project.'),
  projectGoal: z.string().optional().describe('The main objective or problem the project aims to solve. (Optional)'),
});
export type ProjectDescriptionInput = z.infer<typeof ProjectDescriptionInputSchema>;

const ProjectDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A concise and compelling project description suitable for a professional portfolio.'),
});
export type ProjectDescriptionOutput = z.infer<typeof ProjectDescriptionOutputSchema>;

export async function generateProjectDescription(
  input: ProjectDescriptionInput
): Promise<ProjectDescriptionOutput> {
  return aiProjectDescriptionGeneratorFlow(input);
}

const projectDescriptionPrompt = ai.definePrompt({
  name: 'projectDescriptionPrompt',
  input: { schema: ProjectDescriptionInputSchema },
  output: { schema: ProjectDescriptionOutputSchema },
  prompt: `You are an expert copywriter specializing in creating concise and compelling project descriptions for a professional frontend developer and creative designer's portfolio. The descriptions should be engaging, highlight key aspects, and be professional.

Generate a project description based on the following details:

Project Name: {{{projectName}}}
Project Type: {{{projectType}}}
Technologies Used: {{#each technologiesUsed}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Key Features: {{#each keyFeatures}}- {{{this}}}\n{{/each}}
{{#if projectGoal}}Project Goal: {{{projectGoal}}}\n{{/if}}

Your description should:
- Be concise, typically 2-4 sentences.
- Highlight the project's purpose and what it achieves.
- Mention the primary technologies used.
- Emphasize the unique or impressive aspects of the project.
- Be written in a professional and engaging tone, suitable for a high-end portfolio.

Output ONLY the description in the specified JSON format.`,
});

const aiProjectDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'aiProjectDescriptionGeneratorFlow',
    inputSchema: ProjectDescriptionInputSchema,
    outputSchema: ProjectDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await projectDescriptionPrompt(input);
    return output!;
  }
);
