
'use server';

/**
 * @fileOverview An AI agent to edit a multi-page website based on user instructions.
 * 
 * - editWebsite - A function that handles the website editing process.
 * - EditWebsiteInput - The input type for the editWebsite function.
 * - EditWebsiteOutput - The return type for the editWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FileObjectSchema = z.object({
    fileName: z.string().describe('The name of the file, e.g., index.html, styles.css.'),
    content: z.string().describe('The full content of the file.'),
});

const EditWebsiteInputSchema = z.object({
    currentFiles: z.array(FileObjectSchema).describe('An array of file objects representing the current website state.'),
    instruction: z.string().describe('The user\'s instruction on what to change.'),
});
export type EditWebsiteInput = z.infer<typeof EditWebsiteInputSchema>;

const EditWebsiteOutputSchema = z.object({
    files: z.array(FileObjectSchema).describe('An array of file objects representing the entire updated website.'),
});
export type EditWebsiteOutput = z.infer<typeof EditWebsiteOutputSchema>;

export async function editWebsite(
    input: EditWebsiteInput
): Promise<EditWebsiteOutput> {
    return editWebsiteFlow(input);
}

const prompt = ai.definePrompt({
    name: 'editWebsitePrompt',
    input: { schema: EditWebsiteInputSchema },
    output: { schema: EditWebsiteOutputSchema },
    prompt: `You are an expert website developer. You will be given the current files for a website and an instruction to modify it.

You must return the complete and updated set of all files for the website, with the modification applied. Ensure all HTML, CSS, and JS files are consistent and up-to-date.

Do not just return the changed file. Return ALL files that make up the website.

Current Website Files (JSON format):
\`\`\`json
{{{jsonEncode currentFiles}}}
\`\`\`

Modification Instruction:
"{{{instruction}}}"

Now, generate the complete, updated set of files based on the instruction.`,
});

const editWebsiteFlow = ai.defineFlow(
    {
        name: 'editWebsiteFlow',
        inputSchema: EditWebsiteInputSchema,
        outputSchema: EditWebsiteOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
