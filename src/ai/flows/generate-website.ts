
'use server';

/**
 * @fileOverview An AI agent to generate a website based on a description.
 * 
 * - generateWebsite - A function that handles the website generation process.
 * - GenerateWebsiteInput - The input type for the generateWebsite function.
 * - GenerateWebsiteOutput - The return type for the generateWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateWebsiteInputSchema = z.object({
    description: z.string().describe('A description of the website to build.'),
});
export type GenerateWebsiteInput = z.infer<typeof GenerateWebsiteInputSchema>;

const GenerateWebsiteOutputSchema = z.object({
    htmlContent: z.string().describe('The complete HTML content for a single-page landing page, styled with Tailwind CSS.'),
});
export type GenerateWebsiteOutput = z.infer<typeof GenerateWebsiteOutputSchema>;

export async function generateWebsite(
    input: GenerateWebsiteInput
): Promise<GenerateWebsiteOutput> {
    return generateWebsiteFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateWebsitePrompt',
    input: { schema: GenerateWebsiteInputSchema },
    output: { schema: GenerateWebsiteOutputSchema },
    prompt: `You are an expert website designer and developer. 
    
    Given a description of a business or website idea, you will generate the complete HTML for a beautiful and professional single-page landing page.
    
    The output should be a JSON object that matches the provided schema, containing a single 'htmlContent' field with the full HTML document.

    Your response MUST be a single HTML file. Do not include any other files.
    
    The HTML must be styled using Tailwind CSS classes. You can assume Tailwind is available. Do not use inline styles or a <style> tag.
    
    The page should include the following sections:
    1.  A modern navigation bar with a logo and links.
    2.  An impactful hero section with a clear headline, subtitle, and a call-to-action button.
    3.  A features section highlighting 3-4 key benefits or services. Use lucide-react icons where appropriate.
    4.  A compelling call-to-action section.
    5.  A simple footer with copyright information and social links.

    Use placeholder images from picsum.photos (e.g., https://picsum.photos/800/600).
    For icons, use names from the 'lucide-react' library (e.g., 'Rocket', 'ShieldCheck').

    Business Description: {{{description}}}`,
});

const generateWebsiteFlow = ai.defineFlow(
    {
        name: 'generateWebsiteFlow',
        inputSchema: GenerateWebsiteInputSchema,
        outputSchema: GenerateWebsiteOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
